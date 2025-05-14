import style from "./WelcomeCard.module.css"
import Icone from "../../assets/image/Icone.svg"
import UserOptions from "./UserOptions"
//função para usuario fazer escolha de cliente e vendedor
export default function WelcomeCard(){
    return(
        <div className={style.formbox}>
            <section>
                <h2>Olá,</h2>
                <h2>Bem-vindo ao UniFood</h2>
            </section>
            
            <section>
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
            </section>
        </div>
    )
}