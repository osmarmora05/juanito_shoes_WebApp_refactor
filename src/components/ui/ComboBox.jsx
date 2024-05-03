
import React, { useState, useEffect } from "react";
import "../../css/combobox.css";
import categorias from "../../mockups/categorias.json";

function ComboBox({ title, value, setFieldValue }) {
    const [categoriasData, setCategoriasData] = useState([]);

    useEffect(() => {
        setCategoriasData(categorias);
    }, [categorias]); // Actualiza categoriasData cuando categorias cambia

    const handleSelectCategoria = (e) => {
        const selectedValue = e.target.value;
        console.log("Valor seleccionado",selectedValue);
        setFieldValue("categoria", selectedValue); // Actualiza correctamente el campo "categoria"
    };
    console.log("valor de value",value);

    return (
        <>
            <label className="combobox__title">{title}</label>
            <select
                className="combobox__select"
                value={value}
                onChange={handleSelectCategoria}
            >
                <option value="">Seleccione una opción</option>
                {categoriasData.map((categoria) => (
                    <option
                        className="combobox__option"
                        value={categoria.id}
                        key={categoria.id}
                    >
                        
                        {categoria.Nombre}
                    </option>
                ))}
            </select>
        </>
    );
}

export default ComboBox;
