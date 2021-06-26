const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const expressJwt = require("express-jwt");
const db = require("./db");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();

app.use(cors(), bodyParser.json(), expressJwt({ secret: jwtSecret, credentialsRequired: false }));

const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf8" });
const resolvers = require("./resolvers");
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: "/graphql" });
app.get("/", (req, res) => {
  console.log(req);
  res.sendStatus(200);
});
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});
app.listen(port, () => console.info(`Server started on port ${port}`));
