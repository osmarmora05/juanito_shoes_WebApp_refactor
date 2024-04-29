import { Navigate } from "react-router-dom";
import { useAuthContenxt } from "../context/ContextAuthenticatedUser";

export default function ProtectRouted({ children }) {
  const { user } = useAuthContenxt();

  if (!user) {
    return <Navigate to={"/Login"} />;
  }
  return children;
}