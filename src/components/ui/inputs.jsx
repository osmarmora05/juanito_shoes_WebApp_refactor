import "../../css/inputs.css";
import { EyeIcon, EyeOffIcon, SearchIcon } from "./Icons";
import { useRef,useState,useEffect } from "react";

export function TextBox({ title, name, placeHolder, handleOnchange, value, type = "text" }) {
  return (
    <>
      <label className="textbox__label">{title}</label>
      <input
        className="textbox__input"
        type={type}
        name={name}
        placeholder={placeHolder}
        onChange={handleOnchange}
        value={value}
      />
    </>
  );
}

export default function TextBoxSearch({
  title,
  name,
  placeHolder,
  handleOnchange,
  value,
}) {
  return (
    <>
      <label className="textbox-search__label">{title}</label>
      <label>
        <SearchIcon />
        <input
          type="text"
          className="textbox-search__input"
          name={name}
          placeholder={placeHolder}
          onChange={handleOnchange}
          value={value}
        />
      </label>
    </>
  );
}

export function TextArea({ title, name, placeHolder, handleOnchange, value }) {
  return (
    <>
      <label className="textarea__label">{title}</label>
      <textarea
        rows={5}
        className="textarea__input"
        name={name}
        placeholder={placeHolder}
        onChange={handleOnchange}
        value={value}
      />
    </>
  );
}

export function PasswordBox({
  title,
  name,
  placeHolder,
  handleOnchange,
  value,
}) {
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  
  useEffect(() => {
    passwordInputRef.current.type = showPassword ? "text" : "password";
  }, [showPassword]);

  return (
    <>
      <label className="password-box__label">{title}</label>
      <label>
        {showPassword ? (
          <div className="password-box__eye">
              <EyeIcon handleOnClick={togglePasswordVisibility} />
          </div>
        ) : (
          <div className="password-box__eye">
            <EyeOffIcon handleOnClick={togglePasswordVisibility} />
          </div>
        )}
        <input
          className="password-box__input"
          ref={passwordInputRef}
          type="password"
          name={name}
          placeholder={placeHolder}
          onChange={handleOnchange}
          value={value}
        />
      </label>
    </>
  );
}