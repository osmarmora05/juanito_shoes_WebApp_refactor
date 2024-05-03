import "./css/styles.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/ContextAuthenticatedUser";
import ProtectRouted from "./components/ProtectRouted";
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
import ManagementItems from "./pages/dashboard/ManagementItems";
import { useAuthContenxt } from "./context/ContextAuthenticatedUser";

function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}

function AppContent() {
  const { user } = useAuthContenxt();
  function hasAccess(requiredRoles) {
    if (!user) return false;
    return requiredRoles.includes(user.rol);
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/Panel" />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/OlvidadoTuContraseña" element={<ForgotPassword />} />
      <Route path="/RecuperarCuenta" element={<RecoverAccount />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/Panel/*"
        element={
          <ProtectRouted>
            <LayoutDashboard />
          </ProtectRouted>
        }
      >
        {hasAccess(["Supervisor"]) && (
          <Route path="Catalogo" element={<Catalogue />} />
        )}
        {hasAccess(["Bodegero", "Supervisor"]) && (
          <Route path="RegistroDeEntradas" element={<TicketRegistration />} />
        )}
        {hasAccess(["Cajero", "Supervisor"]) && (
          <Route path="Pedidos" element={<Orders />} />
        )}
        {hasAccess(["Cajero", "Supervisor"]) && (
          <Route path="Stock" element={<Stock />} />
        )}
        {hasAccess(["Admin", "Supervisor"]) && (
          <Route path="Trabajadores" element={<Stock />} />
        )}
        {hasAccess(["Supervisor"]) && (
          <Route path="GestionDeElementos" element={<ManagementItems />} />
        )}
        {hasAccess(["Admin", "Supervisor"]) && (
          <Route path="DatosEmpresa" element={<GeneralCompanyInformation />} />
        )}
        {hasAccess(["Admin", "Supervisor"]) && (
          <Route path="Reportes" element={<Reports />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;