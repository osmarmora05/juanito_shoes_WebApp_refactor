import "../css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  CatalogueIcon,
  TicketRegistrationIcon,
  OrdersIcon,
  StockIcon,
  WorkersIcon,
  ManagementItemsIcon,
  GeneralCompanyInformationIcon,
  ReportsIcon,
  LogoutIcon,
} from "./ui/Icons";
import { useState, useEffect, useRef } from "react";
import { useAuthContenxt } from "../context/ContextAuthenticatedUser";

export default function NavBar() {
  const { user, logout } = useAuthContenxt();
  const [selectedOption, setSelectedOption] = useState("");
  const [showLogout, setShowLogot] = useState(false);
  const popupLogout = useRef();
  const navigate = useNavigate();

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  function hasAccess(requiredRoles) {
    if (!user) return false;
    return requiredRoles.includes(user.rol);
  }

  const determineInitialScreen = () => {
    if (hasAccess(["Supervisor"])) {
      setSelectedOption("catalogue-nav");
      navigate("Catalogo");
    } else if (hasAccess(["Bodegero", "Supervisor"])) {
      setSelectedOption("ticketRegistration-nav");
      navigate("RegistroDeEntradas");
    } else if (hasAccess(["Cajero", "Supervisor"])) {
      setSelectedOption("orders-nav");
      navigate("Pedidos");
    } else if (hasAccess(["Admin", "Supervisor"])) {
      setSelectedOption("workers-nav");
      navigate("Trabajadores");
    } else {
      return "";
    }
  };

  useEffect(() => {
    determineInitialScreen();
    const handleClick = (e) => {
      if (!popupLogout.current || !popupLogout.current.contains(e.target)) {
        setShowLogot(false);
      }
    };

    const closeForm = (e) => {
      if (e.key === "Escape") {
        setShowLogot(false);
      }
    };

    document.body.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", closeForm);

    return () => {
      document.body.addEventListener("mousedown", handleClick);
      document.body.removeEventListener("keydown", closeForm);
    };
  }, []);

  return (
    <nav className="nav">
      <div>
        <img src="/logo_small.png" alt="Logo juanito shoes pequeño" />
      </div>
      <ul className="nav__list">
        {hasAccess(["Supervisor"]) && (
          <NavItem
            to={"Catalogo"}
            option={"catalogue-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("catalogue-nav")}
            icon={<CatalogueIcon className="nav__icon" />}
            tooltip={"Catalogo"}
          />
        )}

        {hasAccess(["Bodegero", "Supervisor"]) && (
          <NavItem
            to={"RegistroDeEntradas"}
            option={"ticketRegistration-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("ticketRegistration-nav")}
            icon={<TicketRegistrationIcon className="nav__icon" />}
            tooltip={"Registrar productos"}
          />
        )}

        {hasAccess(["Cajero", "Supervisor"]) && (
          <NavItem
            to={"Pedidos"}
            option={"orders-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("orders-nav")}
            icon={<OrdersIcon className="nav__icon" />}
            tooltip={"Pedidos"}
          />
        )}

        {hasAccess(["Cajero", "Supervisor"]) && (
          <NavItem
            to={"Stock"}
            option={"stock-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("stock-nav")}
            icon={<StockIcon className="nav__icon" />}
            tooltip={"Stock"}
          />
        )}

        {hasAccess(["Admin", "Supervisor"]) && (
          <NavItem
            to={"Trabajadores"}
            option={"workers-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("workers-nav")}
            icon={<WorkersIcon className="nav__icon" />}
            tooltip={"Trabajadores"}
          />
        )}

        {hasAccess(["Supervisor"]) && (
          <NavItem
            to={"GestionDeElementos"}
            option={"managementItem-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("managementItem-nav")}
            icon={<ManagementItemsIcon className="nav__icon" />}
            tooltip={"Gestion de elementos"}
          />
        )}

        {hasAccess(["Admin", "Supervisor"]) && (
          <NavItem
            to={"DatosEmpresa"}
            option={"generalCompanyInformation-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("generalCompanyInformation-nav")}
            icon={<GeneralCompanyInformationIcon className="nav__icon" />}
            tooltip={"Datos generales de la empresa"}
          />
        )}

        {hasAccess(["Admin", "Supervisor"]) && (
          <NavItem
            to={"Reportes"}
            option={"reports-nav"}
            selectedOption={selectedOption}
            onClick={() => handleRadioChange("reports-nav")}
            icon={<ReportsIcon className="nav__icon" />}
            tooltip={"Reportes"}
          />
        )}
      </ul>

      <div className="nav__pattern-logout">
        {showLogout && (
          <div className="nav__box-logout" ref={popupLogout}>
            <h6 className="nav__box-logout__name">
              {user && user.name ? user.name : "Osmar Adrian Mora Cerna"}
            </h6>
            <div className="nav__box-logout__rol">
              <span
                style={{
                  backgroundColor:
                    user && user.rol
                      ? user.rol === "Supervisor"
                        ? "red"
                        : user.rol === "Bodegero"
                        ? "orange"
                        : user.rol === "Cajero"
                        ? "green"
                        : user.rol === "Admin"
                        ? "gold"
                        : "gray"
                      : "gray",
                }}
              ></span>

              <p>{user && user.rol ? user.rol : "Osmar Adrian Mora Cerna"}</p>
            </div>
            <div className="nav__box-logout__line"></div>
            <div className="nav__box-logout__footer">
              <span
                onClick={() => {
                  setShowLogot(false);
                  logout();
                }}
              >
                <LogoutIcon />
              </span>
              <span>Cerrar sesion</span>
            </div>
          </div>
        )}

        <span
          onClick={() => {
            setShowLogot(true);
          }}
        >
          <img src="/avatar.png" alt="avatar pequeño" />
        </span>
      </div>
    </nav>
  );
}

function NavItem({ to, option, selectedOption, onClick, icon, tooltip = "" }) {
  return (
    <li className="nav__item">
      <Link
        to={to}
        className={`nav__link ${
          selectedOption === option ? "nav__link--selected" : ""
        }`}
        onClick={() => onClick(option)}
        title={tooltip}
      >
        {icon}
      </Link>
    </li>
  );
}
