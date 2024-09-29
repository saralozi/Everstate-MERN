import React, { createContext, useState } from "react";

export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};