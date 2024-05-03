import TextBoxSearch, { TextBox } from "../../components/ui/inputs";
import ScreenHeader from "../../components/ScreenHeader";
import ComboBox from "../../components/ui/ComboBox";
import SelectSize from "../../components/ui/SelectSize";
import SelectColor from "../../components/ui/SelectColor";
import { Form, Formik } from "formik";
import { Toaster, toast } from "sonner";
import "../../css/catalogo.css";
import { useState, useEffect } from "react";
import AddCategories from "../../components/categories/AddCategories";
import data from "../../mockups/catalogo.json";
import { PrimaryButton } from "../../components/ui/Buttons";
import { SecondaryButton } from "../../components/ui/Buttons";
import DialogForm from "../../components/ui/DialogForm";
import React from "react";
import SelectFile from "../../components/ui/SelectFile";

export function Catalogue(){
const [showAddCategoriesForm, setShowAddCategoriesForm] = useState(false);

const [values, setValues] = useState({
    nombre: "",
    modelo: "",
    categoria: "",
    precio: "",
    size: "",
    color: "",
    descripcion: "",
    file: null,
});


useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
    setValues(data);
    }
}, []);
const handleComboBoxChange = (field, value) => {
    setValues({
        ...values,
        [field]: value
    });
};

const handleSubmit = (formValues, actions) => {
    console.log(formValues);
    actions.resetForm();
};
return (
    <section className="catalogo">
    <ScreenHeader title="Catalogo" description="Ingreso de entrada de mercadería" />

    <Formik
        initialValues={values}
        onSubmit={(values, actions) => {
        console.log(values);
        actions.resetForm();
        }}
    >
        {({ handleChange, handleSubmit, setFieldValue }) => (
        <Form className="catalogo__box" onSubmit={handleSubmit}>
            <div className="catalogo__content">
            <div className="catalogo__columns">
                <div className="contenedor__nombre">
                <label htmlFor="nombre">Nombre</label>
                <TextBox
                className="textbox_nombre"
                    id="nombre"
                    name="nombre"
                    placeHolder={"Digite su nombre"}
                    onChange={handleChange}
                />
                </div>

                <div className="contenedor__modelo">
                <label htmlFor="modelo">Modelo</label>
                <TextBox
                    title={""}
                    id="modelo"
                    name="modelo"
                    placeHolder={"Digite su modelo"}
                    handleOnChange={handleChange}
                />
                </div>

                <div className="contenedor__marca">
                    <label htmlFor="marca">Marca</label>
                    <TextBox
                    title={""}
                    id="marca"
                    name="marca"
                    placeHolder={"Digite la marca"}
                    handleOnchange={handleChange}
                    />
                </div>

                <div className="contenedor__categoria">
                <label htmlFor="categoria">Categoría</label>
                <ComboBox
                className="comboBox"
                    title={""}
                    setFieldValue={handleComboBoxChange}
                    fieldValue={"categoria"}
                    value={values.categoria}
                    id="categoria"
                />
                <div className="contenedor__boton" >
                <SecondaryButton
                className="secondary_button"
                    text={"Crear"}
                    handleOnClick={() => {
                    setShowAddCategoriesForm(true);
                    }}
                />
                </div>
                </div>
                <div className="contenedor__descripcion">
                <label  className="label__descripcion" htmlFor="descripcion">Descripción</label>
                <TextBox
                    title={""}
                    id="descripcion"
                    name="descripcion"
                    placeHolder={"Ingrese una descripcion"}
                    HandleOnChange={handleChange}
                />
                </div>
                <div className="contenedor__precio">
                    <label htmlFor="precio" className="label-precio">Precio </label>
                    <TextBox
                    title={""}
                    id="precio"
                    name="precio"
                    placeHolder={"Digite el precio"}
                    HandleOnChange={handleChange}
                    />
                </div>

                <div className="container-seleccionadores">



                <div className="contenedor__size">
                <label htmlFor="size">Tamaño (UK)</label>
                <SelectSize
                    setFieldValue={setFieldValue}
                    fieldValue={"size"}
                    value={values.size}
                />
                </div>

                <div className="contenedor__color">
                <label htmlFor="color">Color</label>
                <SelectColor
                    setFieldValue={setFieldValue}
                    fieldValue={"color"}
                    value={values.color}
                />
                </div>
                </div>


                <div className="contenedor__imagen">
                    <label htmlFor="file" className="label_imagen">Imagen</label>
                <SelectFile     
                    type="file"
                    setFieldValue={setFieldValue}
                    fieldValue={"file"}
                    value={values.file}
                />
                </div>
            </div>
            </div>
            <footer className="catalogo__footer">
            <SecondaryButton text={"Cancelar"} type="reset"
            handleOnClick={() => {
                resetForm();
                toast.success("Limpiado los campos");
            }} />
            <PrimaryButton text={"Aceptar"} type="submit" />
            </footer>
        </Form>
        )}
    </Formik>
    {showAddCategoriesForm && (
        <DialogForm
        content={<AddCategories />}
        setShowForm={setShowAddCategoriesForm}
        />
    )}

    <Toaster />
    </section>
);
}