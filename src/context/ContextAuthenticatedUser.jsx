import { createContext, useState, useMemo, useContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const defaultUser = {
    id: 1,
    name: "osmarmora05",
    rol: "supervisor",
  };


  const [user, setUser] = useState(typeof defaultUser !== "undefined" ? defaultUser : null);
  // TODO: Add a useEffect to load the user from the API

  const login = (newUser) => {
    if (newUser) {
      setUser({
        id: newUser.id,
        name: newUser.Nombre,
        rol: newUser.Rol,
      });
    }
  };

  const logout = () => {
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