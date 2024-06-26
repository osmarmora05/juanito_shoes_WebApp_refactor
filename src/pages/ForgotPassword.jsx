import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import JuanitoStoreImage from "../../public/JuanitoStore.png";
import React from "react";

export default function InformacionEmpresa() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <ToastContainer />
      <div className="imagen-empresa">
        <img src={JuanitoStoreImage} alt="juantistore" />
        <div className="capa-opaca"></div>
      </div>
      <div className="formulario">
        <h1>Recuperar Contrasena</h1>
        <div className="container-caja">
          <div className="formulario-inner">
            <h3>Recupera tu contraseña si has olvidado tu contraseña</h3>
            <div className="container-pass">
              <label className="label-pass"htmlFor="">Email</label>
            <input type="email" title="Email" name="Email" id="input-email"/>
                <div className="container-button">
                  <button type="submit">Enviar Codigo</button>
                  </div>
                  </div>

          </div>
        </div>
      </div>
    </div>
  );
}
