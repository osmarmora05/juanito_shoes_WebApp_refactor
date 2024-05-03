import { useState, useEffect } from "react";
import { CheckIcon } from "./Icons";
import "../../css/selectcolor.css";

const defaultValues = [
    {
        name: "red",
        color: "#f00", // hex
    },
    {
        name: "green",
        color: "#0f0",
    },
    {
        name: "blue",
        color: "#00f",
    },
    {
        name: "black",
        color: "#000",
    },
    {
        name: "white",
        color: "#fff	",
    },
    {
        name: "silver",
        color: "#C0C0C0",
    },
    {
        name: "orange",
        color: "#EA580C",
    },
    {
        name: "yellow",
        color: "#FACC15",
    },
    {
        name: "slategray",
        color: "#708090",
    },
    {
        name: "indianred",
        color: "#CD5C5C",
    },
    {
        name: "skyblue",
        color: "#87CEEB",
    },
    {
        name: "lavender",
        color: "#E6E6FA",
    },
    {
        name: "teal",
        color: "#008080",
    },
];

function SelectColor({
    title,
    values = defaultValues,
    setFieldValue,
    fieldValue,
    value,
}) {
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        setSelectedColor(value); // Sincronizar el color seleccionado con el valor de Formik
    }, [value]);

    const handleSelectedColor = (color) => {
        setSelectedColor(color);
        setFieldValue(fieldValue, color);
    };

    if (values == null) {
        values = defaultValues;
    }

    return (
        <>
            <label className="pallette__title">{title}</label>
            <div
                className={`pallete__content${values.length > 8 ? " pallete__content--column" : ""
                    }`}
            >
                <div className="pallette__box">
                    {values.slice(0, 8).map((item, index) => (
                        <button
                            type="button"
                            className="pallette__outline"
                            key={index}
                            style={{
                                border:
                                    selectedColor === item.name
                                        ? `1px solid ${item.color}`
                                        : "none",
                            }}
                            onClick={() => handleSelectedColor(item.name)}
                            title={item.name}
                        >
                            <span
                                style={{ backgroundColor: item.color }}
                                className="pallette__item"
                                key={index}
                            >
                                {selectedColor === item.name && <CheckIcon />}
                            </span>
                        </button>
                    ))}
                </div>

                {values.length > 8 && (
                    <div className="pallette__box">
                        {values.slice(8).map((item, index) => (
                            <button
                                type="button"
                                className="pallette__outline"
                                key={index}
                                style={{
                                    border:
                                        selectedColor === item.name
                                            ? `1px solid ${item.color}`
                                            : "none",
                                }}
                                onClick={() => handleSelectedColor(item.name)}
                                title={item.name}
                            >
                                <span
                                    style={{ backgroundColor: item.color }}
                                    className="pallette__item"
                                    key={index}
                                >
                                    {selectedColor === item.name && <CheckIcon />}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SelectColor;
