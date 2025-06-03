import NavLogo from "../../components/layout/navLogo/NavLogo"
import style from "./Login.module.css"
import Imagem from "../../assets/image/ImagemLogin.png"
import Signin from "../../features/signup/Signin"

export default function Login(){
    return(
        <div className={style.usercadastro}>
            <NavLogo/>
            <div className={style.userform}>
                <Signin txtBtn="Login"/>
                <div className={style.img_box}>
                    <img src={Imagem} alt="Ilustração de cadastro"/>
                </div>
            </div>
        
        </div>
    )
}
