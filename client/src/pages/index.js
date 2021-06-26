import Head from "next/head";
import Link from "../components/Link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Welcome to XPRO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" mt-24 flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://xpro.com">
            XPRO!
          </a>
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/signin">
            <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Sign in &rarr;</h3>
              <p className="mt-4 text-xl">Sign into your account.</p>
            </div>
          </Link>

          <Link href="/signup">
            <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Sign Up &rarr;</h3>
              <p className="mt-4 text-xl">Create an account and be amazed.</p>
            </div>
          </Link>
          <Link href="/users">
            <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Users &rarr;</h3>
              <p className="mt-4 text-xl">Click to view user information.</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
