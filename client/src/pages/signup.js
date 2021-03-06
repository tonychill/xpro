import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signin } from "../utils/auth";
import Form from "../components/Form";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <Head>
        <title>Welcome to XPRO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="mt-24">Create a user account</div>
        <Form />
      </main>
    </div>
  );

  async function handleSignIn(event) {
    event.preventDefault();

    const signinResponse = await signin(email, password);

    if (signinResponse) {
      //TODO: Set application auth state with context.
      // setState({signgedIn: true});
      //TODO: Push user to the 'users' page.
      console.log(localStorage.getItem(accessTokenKey));
      router.push("/users");
      return;
    }

    // if ("error" in signinResponse) {
    //   //TODO: Set error state in the event that there is a problem with the signin process.
    // }
  }

  function handleChange(event) {
    console.log("signing...");
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }
}
