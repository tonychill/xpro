import Head from "next/head";
import { useEffect, useState, FC } from "react";
import { getUsers, getUsersTEST } from "../utils/gqlRequests";
// import {  } from "next";
// import Link from "../components/Link";
import UserList from "../components/UserList/UserList";

export default function Users({}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    init();

    async function init() {
      //Load users from the server after the component has loaded.
      const users = await getUsers();
      if (users) setUsers(users);
    }
  }, []);
  // console.log(users);
  // const users = [{ firstname: "tony" }, { firstname: "angela" }];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Welcome to XPRO Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h2 className="text-4xl font-bold">The top devs in the game! </h2>

        <UserList users={users} />
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"></div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
