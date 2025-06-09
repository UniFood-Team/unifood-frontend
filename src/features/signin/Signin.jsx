import { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Signin.module.css";

import Input from "../../components/form/input/Input";
import Submit from "../../components/form/submit/Submit";

import { auth } from "../../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

/*icone de mostrar senha*/
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signin({ txtBtn }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    lembreDeMim: false,
  });
  const navigate = useNavigate();
  //mudança de estado dos objetos
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setDados({
      ...dados,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await setPersistence(
        auth,
        dados.lembreDeMim ? browserLocalPersistence : browserSessionPersistence
      );
      const result = await signInWithPopup(auth, provider);

      await salvarUsuarioNoFirestore(result.user);
      navigate("/meusprodutos");
    } catch (error) {
      console.error("Erro no login com Google:", error);
      alert("Erro ao autenticar com o Google.");
    }
  };

  const salvarUsuarioNoFirestore = async (user) => {
    if (!user) return;

    const usuarioRef = doc(db, "usuarios", user.uid);
    const usuarioSnap = await getDoc(usuarioRef);

    if (!usuarioSnap.exists()) {
      await setDoc(usuarioRef, {
        nome: user.displayName || "",
        email: user.email,
        uid: user.uid,
        criadoEm: new Date(),
      });
      console.log("Usuário salvo no Firestore.");
    } else {
      console.log("Usuário já existe no Firestore.");
    }
  };

  const irParaBemvindo = () => {
    navigate("/");
  };

  const [senha, setSenha] = useState(false);

  // Validação básica das informações do usuario
  function validarFormulario(dados) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Object.values(dados).some((v) => v === "" || v === false)) {
      return "Por favor, preencha todos os campos obrigatórios.";
    }

    if (!emailRegex.test(dados.email)) {
      return "Por favor, insira um email válido.";
    }
    if (dados.senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }

    return null;
  }

  const submit = async (e) => {
    e.preventDefault();

    const erro = validarFormulario(dados);
    if (erro) {
      alert(erro);
      return;
    }

    try {
      await setPersistence(
        auth,
        dados.lembreDeMim ? browserLocalPersistence : browserSessionPersistence
      );
      const result = await signInWithEmailAndPassword(
        auth,
        dados.email,
        dados.senha
      );

      await salvarUsuarioNoFirestore(result.user);
      navigate("/meusprodutos");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login.");
    }
  };

  //form de cadastro do cliente
  return (
    <form className={style.formCadastro} onSubmit={submit}>
      <h2 className={style.titulo}>Login</h2>

      <div className={style.googleLogin}>
        <div className={style.googleLogin}>
          <button
            type="button"
            onClick={loginComGoogle}
            className={style.googleBtn}
          >
            Entrar com Google
          </button>
        </div>
      </div>

      <div className={style.divider}>Ou</div>

      <div className={style.emailContainer}>
        <label className={style.labelSenhaEmail}>Email</label>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          value={dados.email}
          customClass="loginEmail"
        />
      </div>

      {/* senha*/}
      <div className={style.passwordWrapper}>
        <label className={style.labelSenhaEmail}>Senha</label>
        <Input
          type={senha ? "text" : "password"}
          name="senha"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
          value={dados.senha}
          customClass="loginSenha"
        />
        {/* Vizualizar senha*/}
        <span
          className={style.vizuSenha}
          onClick={() => setSenha(!senha)}
          style={{ cursor: "pointer" }}
        >
          {senha ? (
            <FaEyeSlash className={style.iconVizu} />
          ) : (
            <FaEye className={style.iconVizu} />
          )}
        </span>
      </div>

      <div className={style.senhaMain}>
        <div className={style.checkboxContainer}>
          <Input
            type="checkbox"
            name="lembreDeMim"
            id="lembreDeMim"
            checked={dados.lembreDeMim}
            handleOnChange={handleChange}
            customClass="checkboxLogin"
          />

          <label className={style.lembrar}>Lembrar de mim</label>
        </div>

        <p className={style.esqueceuSenha}>
          <a href="#">Esqueceu a senha?</a>
        </p>
      </div>

      <Submit text={txtBtn} customClass="btnLogin" />
      <p className={style.cadastrarLogin}>
        Sem conta?
        <span onClick={irParaBemvindo} className={style.cadastroConta}>
          {" "}
          Criar uma conta
        </span>
      </p>
    </form>
  );
}
