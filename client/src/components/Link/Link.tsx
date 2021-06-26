import { FC } from "react";
import A from "next/link";

interface LinkProps {
  href: string;
}
const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <A href={href}>
      <a className="">{children}</a>
    </A>
  );
};

export default Link;
