import { FC } from "react";
import A from "next/link";

interface LinkProps {
  href: string;
}
const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <A href={href}>
      <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">{children}</a>
    </A>
  );
};

export default Link;
