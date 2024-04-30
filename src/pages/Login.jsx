import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css";
import JuanitoStoreImage from "../../public/JuanitoStore.png";
import React, { useState } from "react";
import "../css/inputs.css"
import "../css/login.css";
import { PasswordBox } from "../components/ui/inputs";

import "../components/ui/Icons";


export default function Login() {

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/OlvidadoTuContraseña");
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (!values.username || !values.password) {
      toast.error("Por favor, complete todos los campos."); // Mostrar mensaje de error con toast
      setSubmitting(false);
      return;
    }

    setTimeout(() => {
      setSubmitting(false);
      navigate("/app/*");
      toast.success("¡Inicio de sesión exitoso!");
    }, 400);
  };

  return (
    <div className="container">
      <ToastContainer /> {/* Agrega el componente ToastContainer aquí */}
      <div className="imagen-empresa">
        <img src={JuanitoStoreImage} alt="juantistore" />
        <div className="capa-opaca"></div>
      </div>
      <div className="formulario">
        <h1>Login</h1>
        <div className="container-caja">
          <div className="formulario-inner">
            <h2>Iniciar Sesión</h2>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={Yup.object({
                username: Yup.string().required("Usuario requerido"),
                password: Yup.string().required("Contraseña requerida"),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <input type="username" 
                    name="username"
                    placeholder="Usuario"
                    id = "username-login"
                  />
                  <ErrorMessage name="username" component="div" />

                  <div className="Password-sss">
                  <PasswordBox
                  title="Password"
                  name="password"
                  placeHolder="ingresa tu contrasena"
                  //handleOnchange={handleChange}
                  //value={password}
                  />
                  <ErrorMessage name="password" component="div" />

                  </div>


                

                  <Link to="/OlvidadoTuContraseña">
                    ¿Has olvidado tu contraseña?
                  </Link>
                  <div className="container-button">
                    <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Cargando..." : "Ingresar"}</button>
                
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
