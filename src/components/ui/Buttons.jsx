import "../../css/buttons.css";
import { CloseIcon, EditIcon, TrashIcon } from "./Icons";

export function PrimaryButton({ text, handleOnClick, type="button" }) {
  return (
    <button
      className="primary-btn"
      onClick={handleOnClick}
      type={type}
    >
      {text}
    </button>
  );
}

export function SecondaryButton({ text, handleOnClick, type="button" }) {
  return (
    <button className="secondary-btn" onClick={handleOnClick} type={type}>
      {text}
    </button>
  );
}

export function CloseButton({ handleOnClick, className, type="button" }) {
  return (
    <button className={"close-btn" + " " + className} onClick={handleOnClick} type={type}>
      <CloseIcon />
    </button>
  );
}

export function RemoveButton({ handleOnClick, type="button" }) {
  return (
    <button className={"remove-btn"} onClick={handleOnClick} type={type}>
      <TrashIcon />
    </button>
  );
}

export function EditButton({ handleOnClick, type="button" }) {
  return (
    <button className={"edit-btn"} onClick={handleOnClick} type={type}>
      <EditIcon />
    </button>
  );
}