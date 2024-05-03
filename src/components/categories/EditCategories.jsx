import { Form, Formik } from "formik";
import { TextBox } from "../ui/inputs";
import { PrimaryButton } from "../ui/Buttons";
import { Toaster, toast } from "sonner";
import "../../css/edittableinfo.css";

export default function EditCategories({ row }) {
    return (
        <div className="edit-table">
            <Formik
                initialValues={{
                    nombre: row.Nombre,
                }}
                onSubmit={(values, actions) => {
                    if (values.nombre.length == 0) {
                        toast.error("Ups! se te ha olvidado llenar el campo Nombre");
                        return;
                    }

                    console.log(values)
                    toast.success("Todo correcto");
                    actions.resetForm();
                }}
            >
                {({ handleChange, values, resetForm }) => (
                    <Form className="edit-table__form">
                        <div className="edit-table__content">
                            <label className="edit-table__id">{`Id: ${row.id}`}</label>
                            <div>
                                <TextBox
                                    title={"Nombre"}
                                    placeHolder={"Edite el nombre de la categoría"}
                                    name={"nombre"}
                                    value={values.nombre}
                                    handleOnchange={handleChange}
                                />
                            </div>
                        </div>
                        <footer className="edit-table__footer">
                            <PrimaryButton
                                text={"Aceptar"}
                                type="submit"
                            />
                        </footer>
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
}