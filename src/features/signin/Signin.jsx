import { useState } from 'react';

import style from "./Signin.module.css"

import Input from "../../components/form/input/Input"
import Submit from "../../components/form/submit/Submit"

import { GoogleLogin } from '@react-oauth/google';


/*icone de mostrar senha*/
import { FaEye, FaEyeSlash } from 'react-icons/fa';



export default function Signin({txtBtn}){

    const [dados, setDados] = useState({ email:'', senha:'', lembreDeMim:'' })

    //mudança de estado dos objetos
    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setDados({
            ...dados,
            [name]: type === 'checkbox' ? checked : value
        });
    }


    const [senha, setSenha] = useState(false);

    // Validação básica das informações do usuario
    function validarFormulario(dados) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (Object.values(dados).some(v => v === '' || v === false)) {
            return "Por favor, preencha todos os campos obrigatórios.";
        }

        if (!emailRegex.test(dados.email)) {
            return "Por favor, insira um email válido.";
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
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
            
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
            <h2 className={style.titulo}>Login</h2>

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
                    type={senha ? 'text' : 'password'}
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
                    style={{ cursor: 'pointer' }}
                >
                    {senha ? <FaEyeSlash className={style.iconVizu} /> : <FaEye className={style.iconVizu}/>}
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
                    />

                    <label className={style.lembrar}>Lembrar de mim</label>
                </div>

                <p className={style.esqueceuSenha}>
                    <a href="#">Esqueceu a senha?</a>
                </p>
            </div>

            
            <Submit text={txtBtn} customClass="btnLogin"/>
            <p className={style.cadastrarLogin}>Sem conta? <a href="#">Criar uma conta</a></p>

            
        </form>
    )
}