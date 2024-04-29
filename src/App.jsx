import "./css/styles.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import { AuthContextProvider } from "./context/ContextAuthenticatedUser";
import ProtectRouted from "./components/ProtectRouted";
import NavBar from "./components/NavBar";
import Catalogue from "./pages/dashboard/Catalogue";
import TicketRegistration from "./pages/dashboard/TicketRegistration";
import Orders from "./pages/dashboard/Orders";
import Stock from "./pages/dashboard/Stock";
import NotFound from "./pages/404";
import GeneralCompanyInformation from "./pages/dashboard/GeneralCompanyInformation";
import Reports from "./pages/dashboard/Reports";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Navigate replace to="Login" />} />
        <Route path="*" element={NotFound} />
        <Route path="Login/" element={<Login />} />
        <Route path="Login/OlvidadoTuContraseña" element={<ForgotPassword />} />
        <Route path="Login/RecuperarCuenta" element={<RecoverAccount />} />
        <Route
          path="/Panel"
          element={
            <ProtectRouted>
              <NavBar />
            </ProtectRouted>
          }
        >
          {/* Dependienddo del rol, el no podria acceder a rutas */}
          <Route path="Catalogo" element={<Catalogue />} />
          <Route path="RegistroDeEntradas" element={<TicketRegistration />} />
          <Route path="Pedidos" element={<Orders />} />
          <Route path="Stock" element={<Stock />} />
          <Route path="Trabajadores" element={<Stock />} />
          <Route path="DatosEmpresa" element={<GeneralCompanyInformation />} />
          <Route path="Reportes" element={<Reports />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;