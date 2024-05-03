import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "../../css/selectfiles.css";
import { CloseButton } from "./Buttons";

export default function SelectFile({ setFieldValue, fieldValue, value }) {
    const [file, setFile] = useState(null);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const imageFiles = acceptedFiles.filter((file) =>
                file.type.startsWith("image/")
            );

            if (imageFiles.length == 0) {
                acceptedFiles[0] = null;
                return;
            }

            setFile(acceptedFiles[0]);
            setFieldValue(fieldValue, acceptedFiles[0]);
        },
        [setFieldValue]
    );

    useEffect(() => {
        setFile(value)
    }, [value]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({ onDrop });

    const handleImageFiles = () => {
        setFile(null);
        setFieldValue(fieldValue, null);
    };

    return (
        <>
            <div className="file-box__container">
                <div {...getRootProps()} className="file-box">
                    <input {...getInputProps()} />
                    {file === null && (
                        <p>
                            Arrastre o suelte una imagen o haga clic para seleccionar imagen
                        </p>
                    )}
                </div>
                {file && (
                    <div className="file-box__container-img">
                        <CloseButton
                            className={"file-box__close-btn"}
                            handleOnClick={handleImageFiles}
                        />
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Imagen arrastrada"
                            className="file-box__img"
                        />
                    </div>
                )}
            </div>
        </>
    );
}