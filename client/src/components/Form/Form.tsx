import { FC } from "react";
import FormDropListInput from "../FormDropListInput";
import FormInputField from "../FormInputField";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signup } from "../../utils/auth";
interface FormProps {
  string: string;
}
const Form: FC<FormProps> = ({ string }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState({ firstname: "", lastname: "", email: "", password: "", city: "", state: "", zip: "" });

  const stateOptions = ["Florida", "Missouri", "Georgia", "California", "Mississippi", "Oregon", "New York"];
  const router = useRouter();
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <FormInputField
          label="First Name"
          type="text"
          name="firstname"
          placeholder={"tony"}
          onChange={handleChange}
          className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
        />
        <FormInputField
          label="Last Name"
          type="text"
          name="lastname"
          placeholder={"hill"}
          onChange={handleChange}
          className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
        />
        <FormInputField label="Email" type="text" name="email" placeholder={"hill"} onChange={handleChange} className="w-full md:w-1/2 px-3 mb-6 md:mb-0" />
        <FormInputField
          label="Password"
          type="password"
          name="password"
          placeholder="**************"
          onChange={handleChange}
          className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
        />
        <FormInputField label="City" type="text" name="city" placeholder={"Timbuktwo"} onChange={handleChange} className="w-full md:w-1/3 px-3 mb-6 md:mb-0" />
        <FormDropListInput label="State" listItems={stateOptions} />
        <FormInputField label="Zip" type="text" name="zip" placeholder={"00830"} onChange={handleChange} className="w-full md:w-1/3 px-3 mb-6 md:mb-0" />
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </form>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    let localState = state;
    localState[name] = value;
    setState(localState);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  async function handleSignUp() {
    const signUpResponse = await signup(state);

    if (signUpResponse) {
      //TODO: Set application auth state with context.

      // setState({signgedIn: true});

      //TODO: Push user to the 'users' page.

      router.push("/users");
      return;
    }

    // if ("error" in signinResponse) {
    //   //TODO: Set error state in the event that there is a problem with the signin process.
    // }
  }
};

export default Form;

/*** Notes ***
 * Notes go here.
 */
