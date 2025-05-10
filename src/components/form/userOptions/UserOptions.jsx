import style from "./UserOptions.module.css"

export default function UserOptions({img, label, onClick}){
    return(
        <div className={style.option} onClick={onClick}>
            <img src={img} alt={label} className={style.avatar} />
            <span className={style.avaterNome}>{label}</span>
        </div>
    )
}