import { FC } from "react";

interface UserListProps {
  users: User[];
}

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: number;
  email: string;
  address: string;
  role: UserRole;
}

enum UserRole {
  user = 0,
  client = 1 << 1,
  admin = 1 << 2,
}
const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <ul className=" flex flex-wrap items-center justify-start max-w-4xl mt-6 sm:w-full">
      {users?.map(({ firstname, lastname, phone, email, address }, idx) => (
        <li className=" mt-6 text-left  w-1/3 " key={idx}>
          <div className="p-6 mx-2 border rounded-xl hover:text-green-600 focus:text-green-600">
            <a href="https://google.com">
              <h3 className="text-1xl font-bold">{`${firstname} ${lastname}`}</h3>
              <p className="mt-1 text-md">{email}</p>
              <p className="mt-1 text-md">{phone}</p>
              <p className="mt-1 text-md">{address}</p>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;

/*** Notes ***
 * Notes go here.
 */
