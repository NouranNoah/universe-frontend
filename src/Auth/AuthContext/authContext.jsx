import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("Bearer");
    const role = Cookies.get("role");
    const name = Cookies.get("name");
    const id = Cookies.get("id");

    if (token && role) {
      setUser({ token, role, name, id });
    }
  }, []);

  const login = (data) => {
    setUser(data);
    Cookies.set("Bearer", data.token);
    Cookies.set("role", data.role);
    Cookies.set("name", data.name);
    Cookies.set("id", data.id, { path: "/" });
  };

  const logout = () => {
    Cookies.remove("Bearer");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
