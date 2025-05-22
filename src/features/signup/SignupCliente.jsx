import { useState } from 'react';

import style from "./SignupCliente.module.css"

import Input from "../../components/form/input/Input"
import Submit from "../../components/form/submit/Submit"

import { GoogleLogin } from '@react-oauth/google';


/*icone de mostrar senha*/
import { FaEye, FaEyeSlash } from 'react-icons/fa';



export default function Signup({txtBtn}){

    const [dados, setDados] = useState({nome:'', sobrenome:'', email:'', telefone:'', senha:'', confirmacaoSenha:'', aceitarTermos:'' })

    //mudança de estado dos objetos
    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setDados({
            ...dados,
            [name]: type === 'checkbox' ? checked : value
        });
    }


    const [senha, setSenha] = useState(false);
    const [confirmSenha, setConfirmSenha] = useState(false);

    // Validação básica das informações do usuario
    function validarFormulario(dados) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (Object.entries(dados).some(([key, val]) =>
            key !== 'aceitarTermos' &&  !val)) {
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


    function submit(e){

        e.preventDefault();
        //console.log(dados)

        // Verificação de campos obrigatórios
        const erro = validarFormulario(dados);
        if (erro) {
            alert(erro);
            return;
        }
        console.log(dados)
        // Envia os dados para a API
        /*
        fetch('https://api',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response =>{
            if (!response.ok){
                throw new Error('Erro ao cadastrar');
            }
            return response.json();
        })
        .then(data =>{
            console.log("Cadastro realizado com sucesso:", data);
            // Redirecionar ou exibir mensagem de sucesso
        })
        .catch(error =>{
            console.error("Erro no envio:", error);
            alert("Ocorreu um erro ao cadastrar.");
        });
        */
    }

    
    //form de cadastro do cliente
    return (
        <form className={style.formCadastro} onSubmit={submit}>
            <h2 className={style.titulo}>Cadastre-se</h2>
            <p className={style.subtitulo}>Vamos preparar tudo para que você possa acessar sua conta pessoal.</p>

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
                    placeholder="(92) 00000-0000"
                    handleOnChange={handleChange}
                    value={dados.telefone}
                    customClass="inputInfoBasicas"
                />
            </div>

            {/* senha*/}
            <div className={style.formGroupPassword}>
                
                <div className={style.passwordWrapper}>
                    <Input
                        type={senha ? 'text' : 'password'}
                        text="Senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                        value={dados.senha}
                        customClass="inputSenha"
                        
                    />
                    {/* Vizualizar senha*/}
                    <span
                        className={style.vizuSenha}
                        onClick={() => setSenha(!senha)}
                        style={{ cursor: 'pointer' }}
                    >
                        {senha ? <FaEyeSlash className={style.iconVizu} /> : <FaEye className={style.iconVizu}/>}
                    </span>
                </div>
            </div>

            {/* confirmar senha*/}
            <div className={style.formGroupPassword}>
                
                <div className={style.passwordWrapper}>
                    <Input
                        type={confirmSenha ? 'text' : 'password'}
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
                        style={{ cursor: 'pointer' }}
                    >
                        {confirmSenha ? <FaEyeSlash className={style.iconVizu}/> : <FaEye className={style.iconVizu}/>}
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
                <label>Eu concordo com todos os <a href="#" className={style.termo}>Termos</a> e <a href="#"  className={style.termo}>Políticas de Privacidade</a></label>
            </div>

            
            <Submit text={txtBtn} customClass="btnCriaConta"/>
            <p className={style.loginLink}>Já possui uma conta? <a href="#">Login</a></p>

            <div className={style.divider}>Ou faça login com</div>

            <div className={style.googleLogin}>
                <GoogleLogin
                    className={style.googlecomponent}
                    onSuccess={credentialResponse => {
                        const tokenId = credentialResponse.credential;
                        console.log("Token de ID do Google:", tokenId);

                        // Integração com backend comentada por enquanto:
                        /*
                        fetch("https://sua-api.com/auth/google", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ token: tokenId })
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log("Usuário autenticado com sucesso:", data);
                            // Redirecionar ou salvar token local
                        })
                        .catch(err => {
                            console.error("Erro no login com Google:", err);
                            alert("Erro ao fazer login com Google");
                        });
                        */
                    }}
                    onError={() => {
                        alert("Erro ao autenticar com o Google.");
                    }}
                />
            </div>

            
        </form>
    )
}