import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
