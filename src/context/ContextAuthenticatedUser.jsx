import { createContext, useState, useMemo, useContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // console.log("Estamos en el contexto")
  // console.log(user);
  // TODO: Add a useEffect to load the user from the API

  const login = (newUser) => {
    if (newUser) {
      // console.log(user);
      const userString = JSON.stringify({
        id: newUser.id,
        name: newUser.Nombre,
        rol: newUser.Rol,
      });

      // Almacenar en localStorage
      window.localStorage.setItem("user", userString);

      setUser({
        id: newUser.id,
        name: newUser.Nombre,
        rol: newUser.Rol,
      });
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const authContextValue = useMemo(() => ({ login, logout, user }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContenxt() {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("useAuthContenxt must be used withing a AuthContextProvider");
  }
  return context;
}
