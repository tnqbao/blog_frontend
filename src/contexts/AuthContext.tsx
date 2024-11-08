import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  fullname: string | null;
  login: (fullname: string, keepLogin: string, jwt : string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    const storedFullname = localStorage.getItem("fullname") || sessionStorage.getItem("fullname") || "";
    setFullname(storedFullname);
    setIsAuthenticated(!!storedFullname);
  }, []);

  const login = (fullname: string, keepLogin: string, jwt : string) => {
    if (keepLogin === "true") {
      localStorage.setItem("fullname", fullname);
      localStorage.setItem("jwt", jwt);
    } else {
      sessionStorage.setItem("fullname", fullname);
      sessionStorage.setItem("jwt", jwt);
    }
    setFullname(fullname);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("fullname");
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("fullname");
    sessionStorage.removeItem("jwt");
    setFullname("");
    setIsAuthenticated(false);
  };

  const changeIsOpen = () => { setIsOpen(!isOpen) };
  return (
      <AuthContext.Provider value={{ isAuthenticated, fullname, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
