import { FC } from "react";
import Link from "../Link";

interface NavBarProps {
  string: string;
}
const NavBar: FC<NavBarProps> = ({ string }) => {
  return (
    <header className="fixed top-0 bg-white shadow-md h-20 w-full">
      <div className="p-3 flex items-center flex-auto">
        <Link href="/">
          <img src="/Untitled-1.jpg" className="rounded-full shadow-sm border-none h-12 w-12 bg-green-600"></img>
        </Link>
        <div className="pl-4">
          <p className=" text-green-600 text-opacity-90 text-2xl">Let's build amazing!</p>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

/*** Notes ***
 * Notes go here.
 */
