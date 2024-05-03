import '../../css/reports.css'
import ScreenHeader from "../../components/ScreenHeader";
import ReportCard from "../../components/ReportCards";
import {
  CatalogueIcon,
  TicketRegistrationIcon,
  OrdersIcon,
  ClientIcon,
  WorkersIcon,
} from "../../components/ui/Icons";

export default function Reports() {
  const REPORTS = [
    {
      id: "Catalogo",
      icon: <CatalogueIcon />,
      text: "Catalogo",
    },
    {
      id: "Registro_productos",
      icon: <TicketRegistrationIcon />,
      text: (
        <span>
          Registro
          <br />
          Productos
        </span>
      ),
    },
    {
      id: "Pedidos",
      icon: <OrdersIcon />,
      text: "Pedidos",
    },
    {
      id: "Clientes",
      icon: <ClientIcon />,
      text: "Clientes",
    },
    {
      id: "Trabajadores",
      icon: <WorkersIcon />,
      text: "Trabajadores",
    },
  ];

  return (
    <section className="reports">
      <ScreenHeader title="Reportes" description="Reportes para tus futuros analisis"/>
      <div className="reports__content">
        <ReportCard values={REPORTS} />
      </div>
    </section>
  );
}
