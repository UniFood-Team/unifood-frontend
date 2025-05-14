import style from "./Welcome.module.css"
import WelcomeCard from "./WelcomeCard"
import Logo from "../../components/Logo/Logo"
import WelcomeImage from "../../assets/image/WelcomeImage.png"

const Welcome = () => {
    return (
        <>
            <div className={style.welcomecontainer}>
                <WelcomeCard />
                <div className={style.imagewrapper}>
                    <img src={WelcomeImage} alt="Imagem da tela Bem-Vindo" />
                </div>
            </div>
            <Logo />
        </>
    );
};

export default Welcome;