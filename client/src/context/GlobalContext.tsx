import { useState, useEffect, createContext, FC, MouseEvent } from "react";

interface IGlobalContextProps {
  currentUser: ICurrentUser | null;
  // handleSignIn: (e: MouseEvent) => Promise<void>;
  // handleLogOut: (e: MouseEvent) => Promise<void>;
  // handleSignUp: typeof handleSignUp;
}

interface ICurrentUser {
  name: string;
  email: string;
  id: string;
}

export const GlobalContext = createContext<Partial<IGlobalContextProps>>({});

export const GlobalProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  useEffect(() => {
    (async () => {
      if (!currentUser) {
        //Check local storage for creds
      }
    })();
  }, [currentUser]);

  return <GlobalContext.Provider value={{ currentUser }}>{children}</GlobalContext.Provider>;
};
