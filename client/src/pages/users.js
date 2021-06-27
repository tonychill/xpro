import Head from "next/head";
import { useEffect, useState, FC } from "react";
import { getUsers } from "../utils/gqlRequests";
import UserList from "../components/UserList/UserList";

export default function Users({}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    init();

    async function init() {
      /**
       * Load users from the server when the page has loaded.
       */
      const users = await getUsers();
      console.log(users);
      if (users) setUsers(users);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center marker:py-2 mt-24">
      <Head>
        <title>Welcome to XPRO Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h2 className="text-4xl font-bold">The top devs in the game! </h2>

        <UserList users={users} />
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"></div>
      </main>
    </div>
  );
}
