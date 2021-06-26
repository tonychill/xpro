const { ApolloServer, gql } = require("apollo-server-express");

const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);

const typeDefs = gql(fs.readFileSync("./schema.graphQl", { encoding: "utf8" }));
const resolvers = require("./resolvers");
const context = ({ req }) => ({ user: req.user && db.users.get(req.user.sub) });
const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.post("/signup", (req, res) => {
  console.log(req.body);
  // TODO: Use a package to sanitize values.
  if (!validateEmail(req.body.email)) {
    res.sendStatus(401);
    res.send("Not a valide email.");
  }
  // * if (!validatePassword(req.body.email)) res.send("nope");
  if (validateEmail(req.body.email)) {
    const { email, password, firstname, lastname, city, state, zip } = req.body;
    const role = generateRole();
    const userId = db.users.create({ email, password, firstname, lastname, role, city, state, zip });
    const token = jwt.sign({ sub: userId, role }, jwtSecret);
    res.send({ token });
  }
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret);
  res.send({ token });
});

function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function validatePassword(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function generateRole() {
  // * Randomizes role assignment when users sign up.
  const random = Math.random();
  if (random >= 0.6666666) return "admin";
  if (random >= 0.33333 && random < 0.666666) return "client";
  return "user";
}

app.listen(port, () => console.info(`Server started on port ${port}`));
