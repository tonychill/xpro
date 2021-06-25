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
    <div style={{ display: "rando" }} className=" flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
      <div>The A Team</div>
      <ul className=" flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        {users.map((user, idx) => (
          <li key={idx}>
            <a href="https://google.com" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">{user.firstname}</h3>
              <p className="mt-4 text-xl">More user info will go here.</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

/*** Notes ***
 * Notes go here.
 */
