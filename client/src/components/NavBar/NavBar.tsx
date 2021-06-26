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
          <div className="rounded-full h-12 w-12 bg-blue-500"></div>
        </Link>
        <div>Welcome...</div>
      </div>
    </header>
  );
};

export default NavBar;

/*** Notes ***
 * Notes go here.
 */
