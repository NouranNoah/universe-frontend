import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { generateToken } from "../../services/firebase"; // اتأكد الاسم صح

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // لما الصفحة تحمل، جلب البيانات من الـ localStorage
  useEffect(() => {
    const token = Cookies.get("Bearer");
    const role = localStorage.getItem("role");
    const type = localStorage.getItem("type");
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");

    if (token && role) {
      setUser({ token, role, type, name, id });
    }

    setLoading(false);
  }, []);

  // لو فيه user موجود، حاول تولد FCM token (اختياري)
  useEffect(() => {
    if (user) {
      const handleFCM = async () => {
        try {
          await generateToken();
          console.log("FCM token handled successfully");
        } catch (err) {
          console.log("Failed to handle FCM token:", err);
        }
      };
      handleFCM();
    }
  }, [user]);

  const login = async (data) => {
    // حفظ بيانات المستخدم
    Cookies.set("Bearer", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("type", data.type);
    localStorage.setItem("name", data.name);
    localStorage.setItem("id", data.id);

    setUser(data);

    // توليد FCM token بعد login
    try {
      await generateToken();
      console.log("FCM token handled successfully after login");
    } catch (err) {
      console.log("Failed to handle FCM token after login:", err);
    }
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

// Hook لاستخدام الـ AuthContext بسهولة
export const useAuth = () => useContext(AuthContext);
