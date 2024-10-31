import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, keepLogin: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [sessionUsername, setSessionUsername, removeSessionUsername] = useSessionStorage<string | null>("username", null);

  useEffect(() => {
    setIsAuthenticated(!!username || !!sessionUsername);

  }, [username, sessionUsername]);

  const login = (username: string, keepLogin: string) => {
    if (keepLogin==="true") {
      setUsername(username);
    } else {
      setSessionUsername(username);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUsername("");
    removeSessionUsername();
    setIsAuthenticated(false);
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, username: username || sessionUsername, login, logout }}>
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
