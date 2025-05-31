import { InputMask } from "primereact/inputmask";
import style from "./Input.module.css";

export default function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  customClass,
  checked,
  mask,
}) {
  const inputProps = {
    type,
    name,
    id: name,
    placeholder,
    onChange: handleOnChange,
    className: `${style.input} ${customClass ? style[customClass] : ""}`,
  };
  if (mask) {
    return (
      <div className={style.input_container}>
        <label htmlFor={name}>{text}</label>
        <InputMask mask={mask} value={value} {...inputProps} />
      </div>
    );
  }

  return (
    <div className={style.input_container}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={type !== "checkbox" ? value : undefined}
        checked={type === "checkbox" ? checked : undefined}
        placeholder={placeholder}
        onChange={handleOnChange}
        className={`${style.input} ${customClass ? style[customClass] : ""}`}
        //{...(type === 'checkbox' ? { checked } : { value })}
      />
    </div>
  );
}
