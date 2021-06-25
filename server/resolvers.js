const db = require("./db");

const Query = {
  getUser: (_, { id }) => {
    //TODO: check to see is user is actually authenticated.
    db.users.get(id);
  },

  getUsers: (_, b) => {
    let role = "client";
    const users = db.users.list();
    if (role === "admin") return users;
    return users.filter((user) => user.role === role);
  },
};

const Mutation = {
  createUser: (_, { input }, { user }) => {
    console.log(user);
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
