import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { pathname, replace } = useRouter();

  const setUserData = (user, logout) => {
    setUser(user);
    if (logout) {
      localStorage.removeItem("user");
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser({ ...JSON.parse(user) });
    } else {
      if (pathname !== "/login" && pathname !== "/register" && !user) {
        replace("/login");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
