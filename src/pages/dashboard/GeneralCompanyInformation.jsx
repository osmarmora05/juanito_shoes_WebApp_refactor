import "../../css/generalcompanyinformation.css";
import Tabs from "../../components/ui/Tabs";
import ScreenHeader from "../../components/ScreenHeader";
import { TextBox, TextArea } from "../../components/ui/inputs";
import { Formik, Form } from "formik";
import SelectFile from "../../components/ui/SelectFile";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Buttons";
import { Toaster, toast } from "sonner";
import { creatCompany, getCompany } from "../../services/db";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

export default function GeneralCompanyInformation() {
  const TABS = [
    {
      id: 1,
      title: "Agregar datos",
      content: <GeneralCompanyInformationInputs />,
    },
    {
      id: 2,
      title: "Tabla",
      content: <GeneralCompanyInformationTable />,
    },
  ];

  return <Tabs tabs={TABS} />;
}

function GeneralCompanyInformationInputs() {
  async function onAccept(values) {
    creatCompany(
      values.name,
      values.rucNumber,
      values.phoneNumber,
      values.address,
      values.logo,
      values.state
    );
  }

  return (
    <section className="generalcompanyinformation">
      <ScreenHeader
        title="Informacion de la empresa"
        description="Ingresa la informacion general de la empresa"
      />
      <Formik
        initialValues={{
          name: "",
          rucNumber: "",
          phoneNumber: "",
          address: "",
          logo: null,
          state: "Inactivo",
        }}
        onSubmit={(values, actions) => {
          if (
            values.name.length == 0 &&
            values.rucNumber.length == 0 &&
            values.phoneNumber.length == 0 &&
            values.address.length == 0 &&
            values.logo == null
          ) {
            toast.error("Ups! Se te ha olvidado llenar los campos", {
              description:
                "Por favor, asegúrate de completar todos los campos para poder procesar tu solicitud correctamente",
            });
            return;
          }

          for (const property in values) {
            if (values[property] == null || values[property].length == 0) {
              if (property == "name") {
                toast.error("Ups! Se te paso por alto llenar el campo Nombre");
                return;
              } else if (property == "rucNumber") {
                toast.error("Ups! Se te paso por alto llenar el campo Ruc");
                return;
              } else if (property == "phoneNumber") {
                toast.error(
                  "Ups! Se te paso por alto llenar el campo Telefono"
                );
                return;
              } else if (property == "address") {
                toast.error("Ups! Se te paso por alto llenar el campo Correo");
                return;
              } else if (property == "logo") {
                toast.error("Ups! Se te paso por alto llenar el campo Logo");
                return;
              }
            }
          }
          //
          console.log(values);
          onAccept(values);
          toast.success("Todo correcto");
          actions.resetForm();
        }}
      >
        {({ handleChange, values, setFieldValue, resetForm, handleSubmit }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Inputs */}
                <div>
                  <TextBox
                    title={"Nombre"}
                    placeHolder={"Ingresa el nombre de la empresa"}
                    name={"name"}
                    handleOnchange={handleChange}
                    value={values.name}
                  />
                </div>
                <div>
                  <TextBox
                    title={"Numero ruc"}
                    placeHolder={"Ingresa el numero ruc"}
                    name={"rucNumber"}
                    handleOnchange={handleChange}
                    value={values.rucNumber}
                  />
                </div>

                <div>
                  <TextBox
                    title={"Numero de telefono"}
                    placeHolder={"Ingresa el numero de telefono"}
                    name={"phoneNumber"}
                    handleOnchange={handleChange}
                    value={values.phoneNumber}
                  />
                </div>

                <div>
                  <TextArea
                    title={"Dirección"}
                    placeHolder={"Ingresa la dirección"}
                    name={"address"}
                    handleOnchange={handleChange}
                    value={values.address}
                  />
                </div>
              </div>
              {/* Drag and drop */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div>
                  <label>Imagen</label>
                  <SelectFile
                    fieldValue={"logo"}
                    setFieldValue={setFieldValue}
                    value={values.logo}
                  />
                </div>
              </div>
            </div>
            <footer
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <SecondaryButton
                text={"Cancelar"}
                handleOnClick={() => {
                  resetForm();
                  toast.success("Limpiado los campos");
                }}
              />
              <PrimaryButton text={"Aceptar"} type="submit" />
            </footer>
          </Form>
        )}
      </Formik>

      <Toaster />
    </section>
  );
}

function GeneralCompanyInformationTable() {
  const [companyRegistration, setCompanyRegistration] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompany();

        if (result.length === 0 || result === null) {
          setCompanyRegistration([]);
        } else {
          setCompanyRegistration(result);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, []);
  const COLUMNS = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.Nombre,
      sortable: true,
    },

    {
      name: "Numero Ruc",
      selector: (row) => row.Numero_ruc,
      sortable: true,
    },
    {
      name: "Numero de telefono",
      selector: (row) => row.Numero_de_telefono,
      sortable: true,
    },

    {
      name: "Dirección",
      selector: (row) => row.Direccion,
      sortable: true,
    },
    {
      name: "Logo",
      selector: (row) => row.Logo,
      sortable: true,
    },

    {
      name: "Estado",
      selector: (row) => row.Estado,
      sortable: true,
    },
  ];
  return (
    <section className="generalcompanyinformationTable">
      <div style={{ width: "100%", height: "300px", overflowY: "auto" }}>
        {companyRegistration.length == 0 ? (
          <h1>Oh vaya! Parace que no hay registro</h1>
        ) : (
          <DataTable
            columns={COLUMNS}
            data={companyRegistration}
            pagination
            paginationPerPage={4}
            highlightOnHover
          />
        )}
      </div>
    </section>
  );
}
