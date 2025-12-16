import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("mock_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // MOCK LOGIN
  const login = async (usernameOrEmail, password) => {
    // employee login
    if (usernameOrEmail === "employee" && password === "1234") {
      const employeeUser = {
        username: "employee",
        role: "employee",
      };
      localStorage.setItem("mock_user", JSON.stringify(employeeUser));
      setUser(employeeUser);
      return;
    }

    // admin login
    if (usernameOrEmail === "admin" && password === "1234") {
      const adminUser = {
        username: "admin",
        role: "admin",
      };
      localStorage.setItem("mock_user", JSON.stringify(adminUser));
      setUser(adminUser);
      return;
    }

    throw new Error("Invalid credentials");
  };

  const logout = () => {
    localStorage.removeItem("mock_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
