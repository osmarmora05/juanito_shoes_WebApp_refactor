import { Route, Routes, Navigate } from "react-router-dom";
import {
  AuthContextProvider,
  useAuthContenxt,
} from "./context/ContextAuthenticatedUser";
import ProtectRouted from "./components/ProtectRouted";
import NavBar from "./components/NavBar";
import Catalogue from "./pages/dashboard/Catalogue";
import TicketRegistration from "./pages/dashboard/TicketRegistration";
import Orders from "./pages/dashboard/Orders";
import Stock from "./pages/dashboard/Stock";
import NotFound from "./pages/404";
import GeneralCompanyInformation from "./pages/dashboard/GeneralCompanyInformation";
import Reports from "./pages/dashboard/Reports";
import Login from "./pages/Login";
import "../src/css/styles.css";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import LayoutDashboard from "./components/LayoutDashboard";



function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}

function AppContent() {
  const { user } = useAuthContenxt();

  const hasAccess = (requiredRoles) => {
    if (!user) return false;
    return requiredRoles.includes(user.rol);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="Login" />} />
      <Route path="Login" element={<Login />} />
      <Route path="/OlvidadoTuContraseña" element={<ForgotPassword />} />
      <Route path="/RecuperarCuenta" element={<RecoverAccount />} />
      
      <Route path="*" element={<NotFound />} />
      <Route
        path="/Panel"
        element={
          <ProtectRouted>
            <LayoutDashboard />
          </ProtectRouted>
        }
      >
        {hasAccess(["supervisor"]) && (
          <Route path="Catalogo" element={<Catalogue />} />
        )}
        {hasAccess(["bodegero", "supervisor"]) && (
          <Route path="RegistroDeEntradas" element={<TicketRegistration />} />
        )}
        {hasAccess(["cajero", "supervisor"]) && (
          <Route path="Pedidos" element={<Orders />} />
        )}
        {hasAccess(["cajero", "supervisor"]) && (
          <Route path="Stock" element={<Stock />} />
        )}
        {hasAccess(["admin", "supervisor"]) && (
          <Route path="Trabajadores" element={<Stock />} />
        )}
        {hasAccess(["admin", "supervisor"]) && (
          <Route path="DatosEmpresa" element={<GeneralCompanyInformation />} />
        )}
        {hasAccess(["admin", "supervisor"]) && (
          <Route path="Reportes" element={<Reports />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;