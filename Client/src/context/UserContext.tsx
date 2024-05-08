import { createContext, useContext, useState, FC, useEffect } from "react";

interface UserProps {
  fullName: string;
  email: string;
  password: string;
}

const UserContext = createContext<{
  user: UserProps | null;
  register: (userData: UserProps) => void;
  login: (userData: UserProps) => void;
  logout: () => void;
}>({
  user: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const register = (userData: UserProps) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (userData: UserProps) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
