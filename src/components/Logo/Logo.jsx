import style from "./Logo.module.css"
import LogoUnifood from "../../assets/Logo/LogoUnifood.png"

export default function Logo() {
    return (
        <header className={style.header}>
            <img className={style.imagemlogo} src={LogoUnifood} alt="Logo Unifood." />
        </header>
    )
};