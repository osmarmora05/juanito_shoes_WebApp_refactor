import React, { useState, useEffect } from "react";
import ScreenHeader from "../ScreenHeader";
import { Form, Formik } from "formik";
import { TextBox } from "../../components/ui/inputs";
import {
    EditButton,
    PrimaryButton,
    RemoveButton,
    SecondaryButton,
} from "../../components/ui/Buttons";
import { Toaster, toast } from "sonner";
import DataTable from "react-data-table-component";
import data from "../../mockups/categorias.json";
import TextBoxSearch from "../ui/inputs";
import EditCategories from "./EditCategories";
import AlertDialog from "../ui/AlertDialog";
import "../../css/edittableinfo.css";
export default function AddCategories() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [showEditCategories, setShowEditCategories] = useState(false);
    const [field, setField] = useState(null);

    const columns = [
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
            name: "Acciones",
            selector: (row) => (
                <div>
                    <RemoveButton />
                    <EditButton
                        handleOnClick={() => {
                            setShowEditCategories(true);
                            setField(row);
                        }}
                    />
                </div>
            ),
        },
    ];

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

    return (
        <div className="edit-table">
            <ScreenHeader
                title="Registro de categorías"
                description="Ingreso de categorías de productos"
            />
            <Formik
                initialValues={{
                    nombre: "",
                }}
                onSubmit={(values, actions) => {
                    if (values.nombre.length == 0) {
                        toast.error("Ups! se te ha olvidado llenar el campo Nombre");
                        return;
                    }
                const newCategory= {
                    id: records.length + 1,
            Nombre: values.nombre,
                };
                setRecords([...records, newCategory]);

                setFilteredRecords([...filteredRecords, newCategory]);


                    toast.success("Todo correcto");
                    actions.resetForm();
                    
                }}
                
            >
                {({ handleChange, values, resetForm }) => (
                    <Form className="edit-table__form">
                        <div className="edit-table__content">
                            <div>
                                <TextBox
                                    title={"Nombre"}
                                    name={"nombre"}
                                    placeHolder={"Ingrese el nuevo nombre"}
                                    value={values.nombre}
                                    handleOnchange={handleChange}
                                />
                            </div>

                            <footer style={{ display: "flex", justifyContent: "star", alignItems: "end", gap: "10px" }}>
                                <SecondaryButton
                                    text={"Limpiar Campo"}
                                    handleOnClick={() => {
                                        resetForm();
                                        toast.success("Limpiado el campo");
                                    }}
                                />
                                <PrimaryButton type="submit" text={"Aceptar"} />
                            </footer>
                        </div>
                        <div></div>
                    </Form>
                )}
            </Formik>
            <div style={{ width: "100%" }}>
                Buscasr Categorias
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
                        columns={columns}
                        data={filteredRecords}
                        pagination
                        paginationPerPage={4}
                        highlightOnHover
                    />
                )}
            </div>
            {showEditCategories && (
                <AlertDialog
                    content={<EditCategories row={field} />}
                    setShowForm={setShowEditCategories}
                />
            )}
            <Toaster />
        </div>
    );
}
