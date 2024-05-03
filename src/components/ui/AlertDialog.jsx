import { useEffect, useRef } from "react";
import { CloseButton } from "./Buttons";
import '../../css/alertdialog.css'

export default function AlertDialog({ setShowForm, content }) {

    const alertDialogBlurRef = useRef();

    useEffect(() => {
        // We close the form when we click outside of it
        const handleClick = (e) => {
            if (e.target === alertDialogBlurRef.current) {
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
        <div className="alert-dialog-blur" ref={alertDialogBlurRef}>
            <div className="alert-dialog">
                <CloseButton
                    className={"alert-dialog__close-btn"}
                    handleOnClick={() => {
                        setShowForm(false)
                    }}
                />
                {content}
            </div>
        </div>
    )
}