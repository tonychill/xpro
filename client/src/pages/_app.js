import NavBar from "../components/NavBar";
import { Fragment } from "react";
import "../styles/global.css";
// import "tailwindcss/tailwind.css";

function TheOnes({ Component, pageProps }) {
  return (
    <Fragment>
      <NavBar />
      <Component {...pageProps} />;
    </Fragment>
  );
}

export default TheOnes;
