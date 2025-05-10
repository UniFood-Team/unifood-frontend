import style from "./Cadastro.module.css";

import BemVindo from "../../components/layout/bemVindo/BemVindo"
import ilustracao from "../../assets/image/cadastro.svg";
import NavLogo from "../../components/layout/navLogo/NavLogo";

function Cadastro(){
    return(
        <div className={style.wrapper}>
            <NavLogo />
            <div className={style.cadastrocontainer}>
                <BemVindo />
                <div className={style.img_box}>
                    <img src={ilustracao} alt="Ilustração de pedido" />
                </div>
            </div>
        </div>
    )
}

export default Cadastro