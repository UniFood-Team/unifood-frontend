import { useState } from "react";

import style from "./SignupCliente.module.css";

import Input from "../../components/form/input/Input";
import Submit from "../../components/form/submit/Submit";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { auth, db } from "../../../firebase";
import { useToast } from "../../components/toast/ToastContext";

export default function Signup({ txtBtn }) {
  const [dados, setDados] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmacaoSenha: "",
    aceitarTermos: false,
  });

  const [senha, setSenha] = useState(false);
  const [confirmSenha, setConfirmSenha] = useState(false);

  const { addToast } = useToast(); // ✅ USA O CONTEXTO DE TOAST

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setDados({
      ...dados,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function validarFormulario(dados) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      Object.entries(dados).some(
        ([key, val]) => key !== "aceitarTermos" && !val
      )
    ) {
      return "Por favor, preencha todos os campos obrigatórios.";
    }

    if (!emailRegex.test(dados.email)) {
      return "Por favor, insira um email válido.";
    }

    if (dados.senha !== dados.confirmacaoSenha) {
      return "As senhas não coincidem.";
    }

    if (!dados.aceitarTermos) {
      return "Você precisa aceitar os termos e políticas para continuar.";
    }

    return null;
  }

  function submit(e) {
    e.preventDefault();

    const erro = validarFormulario(dados);
    if (erro) {
      addToast({ tipo: "erro", mensagem: erro }); // ✅ substitui o alerta
      return;
    }

    console.log("Dados validados:", dados);
    addToast({
      tipo: "sucesso",
      mensagem: "Cadastro validado com sucesso!",
    });
  }

  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuário autenticado:", user.displayName, user.email);

      addToast({
        tipo: "sucesso",
        mensagem: `Login com Google realizado com sucesso!`,
      });
    } catch (error) {
      console.error("Erro:", error);
      addToast({
        tipo: "erro",
        mensagem: "Ocorreu um erro ao autenticar com o Google.",
      });
    }
  };

  return (
    <form className={style.formCadastro} onSubmit={submit}>
      <h2 className={style.titulo}>Cadastre-se</h2>
      <p className={style.subtitulo}>
        Vamos preparar tudo para que você possa acessar sua conta pessoal.
      </p>

      <div className={style.formRow}>
        <Input
          type="text"
          text="Nome"
          name="nome"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
          value={dados.nome}
          customClass="inputInfoBasicas"
        />
        <Input
          type="text"
          text="Sobrenome"
          name="sobrenome"
          placeholder="Digite seu sobrenome"
          handleOnChange={handleChange}
          value={dados.sobrenome}
          customClass="inputInfoBasicas"
        />
      </div>

      <div className={style.formRow}>
        <Input
          type="email"
          text="Email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          value={dados.email}
          customClass="inputInfoBasicas"
        />
        <Input
          type="tel"
          text="Telefone"
          name="telefone"
          mask="(99) 99999-9999"
          placeholder="(92) 00000-0000"
          handleOnChange={handleChange}
          value={dados.telefone}
          customClass="inputInfoBasicas"
        />
      </div>

      <div className={style.formGroupPassword}>
        <div className={style.passwordWrapper}>
          <Input
            type={senha ? "text" : "password"}
            text="Senha"
            name="senha"
            placeholder="Digite sua senha"
            handleOnChange={handleChange}
            value={dados.senha}
            customClass="inputSenha"
          />
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
      </div>

      <div className={style.formGroupPassword}>
        <div className={style.passwordWrapper}>
          <Input
            type={confirmSenha ? "text" : "password"}
            text="Confirme sua senha"
            name="confirmacaoSenha"
            placeholder="Confirme sua senha"
            handleOnChange={handleChange}
            value={dados.confirmacaoSenha}
            customClass="inputSenha"
          />
          <span
            className={style.vizuSenha}
            onClick={() => setConfirmSenha(!confirmSenha)}
            style={{ cursor: "pointer" }}
          >
            {confirmSenha ? (
              <FaEyeSlash className={style.iconVizu} />
            ) : (
              <FaEye className={style.iconVizu} />
            )}
          </span>
        </div>
      </div>

      <div className={style.checkboxContainer}>
        <Input
          type="checkbox"
          name="aceitarTermos"
          checked={dados.aceitarTermos}
          handleOnChange={handleChange}
          customClass={style.checkedinput}
        />
        <label>
          Eu concordo com todos os{" "}
          <a href="#" className={style.termo}>
            Termos
          </a>{" "}
          e{" "}
          <a href="#" className={style.termo}>
            Políticas de Privacidade
          </a>
        </label>
      </div>

      <Submit text={txtBtn} customClass="btnCriaConta" />
      <p className={style.loginLink}>
        Já possui uma conta? <a href="#">Login</a>
      </p>

      <div className={style.divider}>Ou faça login com</div>

      <div className={style.googleLogin}>
        <button
          type="button"
          className={style.googlecomponent}
          onClick={loginComGoogle}
        >
          Entrar com Google
        </button>
      </div>
    </form>
  );
}
