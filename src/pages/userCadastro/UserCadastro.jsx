import NavLogo from "../../components/layout/navLogo/NavLogo"
import style from "./UserCadastro.module.css"
import Imagem from "../../assets/image/cadastro.svg"
import Signup from "../../components/userInfo/signup/Signup"

export default function UserCadastro(){
    return(
        <div className={style.usercadastro}>
            <NavLogo/>
            <div className={style.userform}>
                <div className={style.img_box}>
                    <img src={Imagem} alt="Ilustração de cadastro"/>
                </div>
                <Signup txtBtn="Criar conta"/>
            </div>
        
        </div>
    )
}