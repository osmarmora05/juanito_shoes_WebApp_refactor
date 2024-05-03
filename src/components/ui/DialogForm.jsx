import { useEffect, useRef } from "react";
import { CloseButton } from "./Buttons";
import "../../css/dialogform.css";

export default function DialogForm({ setShowForm, content, style = "" }) {
    const formBlurRef = useRef();

    useEffect(() => {

        const handleClick = (e) => {
            if (e.target === formBlurRef.current) {
                setShowForm(false);
            }
        };

        const closeForm = (e) => {
            if (e.key === "Escape") {
                setShowForm(false);
            }
        };

        document.body.addEventListener("click", handleClick);
        document.addEventListener("keydown", closeForm);

        return () => {
            document.body.removeEventListener("click", handleClick);
            document.body.removeEventListener("keydown", closeForm);
        };
    }, []);

    return (
        <div className="form-blur" ref={formBlurRef}>
            <div className="form">
                <CloseButton
                    className={"form__close-btn"}
                    handleOnClick={() => {
                        setShowForm(false);
                    }}
                />
                {content}
            </div>
        </div>
    );
}