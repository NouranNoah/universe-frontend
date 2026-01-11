import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 مهم

  useEffect(() => {
    const token = Cookies.get("Bearer");
    const role = localStorage.getItem("role");
    const type = localStorage.getItem("type");
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");

    if (token && role) {
      setUser({ token, role,type, name, id });
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    Cookies.set("Bearer", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("type", data.type);
    localStorage.setItem("name", data.name);
    localStorage.setItem("id", data.id);

    setUser(data);
  };

  const logout = () => {
    Cookies.remove("Bearer");
    localStorage.removeItem("role");
    localStorage.removeItem("type");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
