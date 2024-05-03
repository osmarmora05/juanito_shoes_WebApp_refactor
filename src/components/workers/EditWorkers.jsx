import { Form, Formik } from "formik";
import { PrimaryButton } from "../ui/Buttons";
import { TextBox, PasswordBox } from "../ui/inputs";
import ComboBox from "../ui/ComboBox";
import ScreenHeader from "../ScreenHeader";
import '../../css/edittableinfo.css'

export default function EditWorkers({ row }) {
  console.log(row);
  return (
    <div className="edit-table">
      <ScreenHeader
        title="Edición del personal"
        description="Edita la informacion del personal"
      />
      <Formik
        initialValues={{
          nombre: row.Nombre,
          contraseña: row.Contraseña,
          correo: row.Correo,
          rol: [{ text: row.Rol, value: row.Rol }]
        }}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className="edit-table__form">
            <div className="edit-table__content">
              <label className="edit-table__id">{`Id: ${row.id}`}</label>
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
                  name={"contraseña"}
                  handleOnchange={handleChange}
                  value={values.contraseña}
                />
              </div>

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
              <div style={{ display: "block" }}>
                <ComboBox
                  title={"Roles"}
                  fieldValue={"rol"}
                  value={values.rol}
                  setFieldValue={setFieldValue}
                  values={values.rol}
                />
              </div>
            </div>
            <footer className="edit-table__footer">
              <PrimaryButton text={"Aceptar"} />
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  );
}