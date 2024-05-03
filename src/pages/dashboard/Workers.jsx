import { Form, Formik } from "formik";
import ScreenHeader from "../../components/ScreenHeader";
import {
  EditButton,
  PrimaryButton,
  RemoveButton,
  SecondaryButton,
} from "../../components/ui/Buttons";
import TextBoxSearch, { PasswordBox, TextBox } from "../../components/ui/inputs";
import ComboBox from "../../components/ui/ComboBox";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import "../../css/trabajadores.css";
import data from "../../mockups/trabajadores.json";
import DataTable from "react-data-table-component";
import DialogForm from "../../components/ui/DialogForm";
import EditWorkers from "../../components/workers/EditWorkers";

const ROLES = [
  {
    text: "Bodeguero",
    value: "Bodeguero",
  },
  {
    text: "Administrador",
    value: "Administrador",
  },
  {
    text: "Vendedor",
    value: "Vendedor",
  },
];

export default function Workers() {
  const [showEditWorkersForm, setShowEditWorkersForm] = useState(false);
  const [field, setField] = useState(null);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const handleChangeRecords = (e) => {
    const filteredRecords = records.filter((record) => {
      return record.Nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredRecords(filteredRecords);
  };
  
  // Verificamos si existen los datos
  useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
      setRecords(data);
      setFilteredRecords(data);
    }
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
      name: "Correo",
      selector: (row) => row.Correo,
      sortable: true,
      wrap: true,
    },
    {
      name: "Contraseña",
      selector: (row) => row.Contraseña,
      sortable: true,
      wrap: true,
    },
    {
      name: "Rol",
      selector: (row) => row.Rol,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <RemoveButton />
          <EditButton
            handleOnClick={() => {
              setShowEditWorkersForm(true);
              setField(row);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="trabajadores">
      <ScreenHeader
        title="Registro de trabajadores"
        description="Crea credenciales, establece roles, edítalos y elimínalos"
      />
      <Formik
        initialValues={{
          nombre: "",
          correo: "",
          password: "",
          roles: "",
        }}
        onSubmit={(values, actions) => {
          if (
            values.nombre.length == 0 &&
            values.password.length == 0 &&
            values.correo.length == 0 &&
            values.roles.length == 0
          ) {
            toast.error("Ups! Se te ha olvidado llenar los campos", {
              description:
                "Por favor, asegúrate de completar todos los campos para poder procesar tu solicitud correctamente",
            });
            return;
          }

          for (const property in values) {
            if (values[property] == null || values[property].length == 0) {
              if (property == "password") {
                toast.error(
                  "Ups! Se te paso por alto llenar el campo Contraseña"
                );
                return;
              } else if (property == "roles") {
                toast.error("Ups! Se te paso por alto llenar el campo Rol");
                return;
              } else {
                const unfilledField =
                  property.charAt(0).toUpperCase() + property.slice(1);
                toast.error(
                  "Ups! Se te paso por alto llenar el campo " + unfilledField
                );
                return;
              }
            }
          }

          toast.success("Todo correcto");
          console.log(values);
          actions.resetForm();
        }}
      >
        {({ handleChange, values, setFieldValue, resetForm }) => (
          <Form className="trabajadores__form">
            <div className="trabajadores__columns">
              {/* Primera columna */}
              <div>
                <TextBox
                  title={"Nombre"}
                  placeHolder={"Ingrese el nombre"}
                  name={"nombre"}
                  handleOnchange={handleChange}
                  value={values.nombre}
                />
              </div>
              <div>
                <PasswordBox
                  title={"Contraseña"}
                  placeHolder={"Ingrese la contraseña"}
                  name={"password"}
                  handleOnchange={handleChange}
                  value={values.password}
                />
              </div>
              {/* Segunda columna */}
              <div>
                <TextBox
                  title={"Correo"}
                  type="email"
                  placeHolder={"Ingrese el correo"}
                  name={"correo"}
                  handleOnchange={handleChange}
                  value={values.correo}
                />
              </div>
              <div>
                <ComboBox
                  title={"Roles"}
                  values={ROLES}
                  fieldValue={"roles"}
                  setFieldValue={setFieldValue}
                  value={values.roles}
                />
              </div>
            </div>
            <footer>
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
      {showEditWorkersForm && (
      <DialogForm
        content={<EditWorkers row={field} />}
        setShowForm={setShowEditWorkersForm}
      />
      )}
      <div style={{ width: "100%" }}>
        Busque trabajadores
        <TextBoxSearch
          placeHolder={"Buscar..."}
          handleOnchange={handleChangeRecords}
        />
      </div>
      <div style={{ width: "100%", height: "300px", overflowY: "auto" }}>
        {records.length === 0 ? (
          "Sin valores"
        ) : (
          <DataTable
            columns={COLUMNS}
            data={filteredRecords}
            pagination
            paginationPerPage={4}
            highlightOnHover
          />
        )}
      </div>
      <Toaster />
    </section>
  );
}