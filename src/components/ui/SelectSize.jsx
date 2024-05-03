import { useState, useEffect } from "react";
import "../../css/selectsize.css";

const defaultValues = [6, 7, 8, 9, 10, 11, 12];

function SelectSize({
    title,
    values = defaultValues,
    setFieldValue,
    fieldValue,
    value
}) {
    const [selectedOption, setSelectedOption] = useState("");

    if (values == null) {
        values = defaultValues;
    }

    useEffect(() => {
        setSelectedOption(value); // Sincronizar el color seleccionado con el valor de Formik
    }, [value]);

    const handleSelectedOption = (option) => {
        setSelectedOption(option);
        setFieldValue(fieldValue, option);
    };

    return (
        <>
            <label className="size-range__label">{title}</label>
            <div
                className={`size-range${values.length > 7 ? " size-range--column" : ""
                    }`}
            >
                {/* Primeros siete elementos */}
                <div className="size-range__box-item">
                    {values.slice(0, 7).map((item, index) => (
                        <div
                            className={`size-range__item ${selectedOption === item ? "size-range__item--selected" : ""
                                }`}
                            key={index}
                            onClick={() => {
                                handleSelectedOption(item);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                {/* Elementos restantes, si hay más de siete */}
                {values.length > 7 && (
                    <div className="size-range__box-item">
                        {values.slice(7).map((item, index) => (
                            <div
                                className={`size-range__item ${selectedOption === item ? "size-range__item--selected" : ""
                                    }`}
                                key={index + 7}
                                onClick={() => {
                                    handleSelectedOption(item);
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SelectSize;