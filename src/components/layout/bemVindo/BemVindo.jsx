import React from "react";
import style from "./BemVindo.module.css"
import Icone from "../../../assets/image/Icone.svg"
import UserOptions from "../../form/userOptions/UserOptions";
//função para usuario fazer escolha de cliente e vendedor
export default function BemVindo(){
    return(
        <div className={style.formbox}>
            <h2>Olá,</h2>
            <h2>Bem-vindo ao UniFood</h2>
            <p>Continuar como</p>
            
            <div className={style.buttonGroup}>
                <UserOptions
                    img={Icone}
                    label={"Cliente"}
                />
                <UserOptions
                    img={Icone}
                    label={"Vendedor"}
                />
                
            </div>

        </div>
        
    )
}