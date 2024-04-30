import { RobotIcon } from "../components/ui/Icons"
import "../css/notfound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__box">
        <div className="not-found__404-icon-and-title-box">
          <RobotIcon />
          <h1 className="not-found__404">404</h1>
        </div>
        <h2 className="not-found__text">
          La página que buscas no se encuentra aquí. <br /> ¿Por qué no intentas
          regresar a la pagina de inicio?
        </h2>
      </div>
    </section>
  );
}

export default NotFound;