const db = require("./db");

const Query = {
  user: (_, { id }) => {
    //TODO: check to see is user is actually authenticated.
    db.users.get(id);
  },

  users: (_, b, ctx) => {
    const role = ctx.user.role;

    const users = db.users.list();
    console.log(users);
    if (role == undefined) return [];
    if (role === "admin") return users;

    if (role === "client") return users.filter((user) => user.role !== "admin");

    let bottom = [];
    for (let user of users) {
      if (user.role !== "admin" && user.role !== "client") bottom.push(user);
    }
    return bottom;
  },
};

const Mutation = {
  createUser: (_, { input }, { user }) => {
    console.log(user, "this i sthe user");
    if (!user) throw Error("Sorry, you are unauthorized to perform this acction. ");
    const id = db.users.create({ ...input, companyId: user.companyId });
    return db.users.get(id);
  },
};
// const Users = {
//   users: (company, args) => db.users.list().filter((job) => company.id === job.companyId),
// };

// const Job = {
//   company: (job) => db.companies.get(job.companyId),
// };
module.exports = { Query, Mutation };
