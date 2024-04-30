import "../css/inputs.css";
import "../css/login.css";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import JuanitoStoreImage from "../../public/JuanitoStore.png";
import React, { useState } from "react";
import { PasswordBox } from "../components/ui/inputs";
import { getSpecificUser } from "../services/db";
import { Toaster, toast } from "sonner";
import { useAuthContenxt } from "../context/ContextAuthenticatedUser";

export default function Login() {
  const { login, user } = useAuthContenxt();
  const navigate = useNavigate();

  async function onSubmit(email, password) {
    try {
      const result = await getSpecificUser(email, password);

      if (result === null) {
        toast.warning("Oye! Parace que no estas registrado", {
          description:
            "Por que no intentas nuevamente o contactas con soporte tecnico",
        });
      } else {
        login({
          id: result[0].id,
          Nombre: result[0].Nombre,
          Rol: result[0].Rol,
        });
      }

      navigate("/Panel");
    } catch (error) {
      console.error(
        "Hubo un error al obtener la información del usuario:",
        error
      );
    }
  }
  return (
    <div className="container">
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
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                if (values.email.length == 0 && values.password.length == 0) {
                  toast.error("Ups! Se te ha olvidado llenar los campos", {
                    description:
                      "Por favor, asegúrate de completar todos los campos para poder procesar tu solicitud correctamente",
                  });
                  return;
                }

                for (const property in values) {
                  if (
                    values[property] == null ||
                    values[property].length == 0
                  ) {
                    if (property == "email") {
                      toast.error(
                        "Ups! Se te paso por alto llenar el campo Correo"
                      );
                      return;
                    } else if (property == "password") {
                      toast.error(
                        "Ups! Se te paso por alto llenar el campo Contraseña"
                      );
                      return;
                    }
                  }
                }

                // Verificar si el usuario esta en la BD
                // const result = getSpecificUser(values.email, values.password);
                // console.log(result[0].Cedula);

                onSubmit(values.email, values.password);

                // getSpecificUser(values.email, values.password)
                //   .then((result) => {
                //     // Acceder directamente a la propiedad "Cedula" del resultado
                //     console.log("La cédula del usuario es:", result[0].Cedula);
                //   })
                //   .catch((error) => {
                //     console.error(
                //       "Hubo un error al obtener la información del usuario:",
                //       error
                //     );
                //   });
              }}
            >
              {({ isSubmitting, handleChange, values }) => (
                <Form>
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    onChange={handleChange}
                    value={values.email}
                    id="username-login"
                  />
                  {/* <ErrorMessage name="email" component="div" /> */}
                  <div className="Password-sss">
                    <div className="password-box__container">
                      <PasswordBox
                        title="Password"
                        name="password"
                        placeHolder="ingresa tu contrasena"
                        handleOnchange={handleChange}
                        value={values.password}
                      />
                      <div className="password-box__eye"></div>
                    </div>
                    {/* <ErrorMessage name="password" component="div" /> */}
                  </div>
                  <Link to="/OlvidadoTuContraseña">
                    ¿Has olvidado tu contraseña?
                  </Link>
                  <div className="container-button">
                    <button type="submit">"Ingresar"</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
