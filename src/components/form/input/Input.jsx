import style from "./Input.module.css"

export default function Input({type, text, name, placeholder, handleOnChange, value, customClass}){
    return(
        <div className={style.input_container}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                className={`${style.input} ${customClass ? style[customClass] : ''}`}
            />
        </div>
        
    )

}