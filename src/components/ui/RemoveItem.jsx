import { Form, Formik } from "formik";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons"
import { Toaster, toast } from "sonner";
import "../../css/removeitem.css";

export default function RemoveItem({ row }) {
    return (
        <div className="remove-item">
            <Formik
                initialValues={{
                    id: row.id,
                }}
            >
                <Form className="remove-item__form">
                    <div className="remove-item__content">
                        <h2 className="remove-item__title">
                            Deseas eliminar este elemento?
                        </h2>
                        <p className="remove-item__text">
                            Esta acción eliminara completamente el elemento
                        </p>
                    </div>
                    <footer className="remove-item__footer">
                        <PrimaryButton
                            text={"Aceptar"}
                            handleOnClick={() => {
                                toast.success("Eliminado satisfactoriamente");
                            }}
                        />
                    </footer>
                </Form>
            </Formik>
            <Toaster />
        </div>
    );
}
