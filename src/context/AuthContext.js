import {
  createContext,
  useState
} from "react";

export const AuthContext =
  createContext();

export function AuthProvider({
  children
}) {

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("auth") === "true"
    );

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}