import style from "./UserOptions.module.css"

import { useNavigate } from "react-router-dom"

export default function UserOptions({img, label, to}){
    const navigation = useNavigate();

    const handlerClick = () => {
        navigation(to);
    }
    return(
        <div className={style.option} onClick={handlerClick}>
            <img src={img} alt={label} className={style.avatar} />
            <span className={style.avaterNome}>{label}</span>
        </div>
    )
}