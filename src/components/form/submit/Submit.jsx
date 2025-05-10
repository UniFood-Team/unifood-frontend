import style from "./Submit.module.css"
export default function Submit({text}){
    return(
        <div className={style.cont_submit}>
            <button className={style.button_submit}>{text}</button>
        </div>
    )
}