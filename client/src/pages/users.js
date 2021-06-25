import Head from "next/head";
// import Link from "../components/Link";
import UserList from "../components/UserList/UserList";
export default function Home() {
  const users = [{ firstname: "tony" }, { firstname: "angela" }];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Welcome to XPRO Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h2 className="text-4xl font-bold">The top devs in the game! </h2>

        <p className="mt-3 text-2xl">
          Get started by editing <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">pages/index.js</code>
        </p>

        <UserList users={users} />
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"></div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
