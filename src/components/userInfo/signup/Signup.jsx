import { useState } from 'react';

import style from "./Signup.module.css"

import Input from "../../form/input/Input"
import Submit from "../../form/submit/Submit"






export default function Signup({txtBtn}){

    const [dados, setDados] = useState({nome:'', sobrenome:'', email:'', telefone:'', senha:'', confirmacaoSenha:'', aceitarTermos:'' })

    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setDados({
            ...dados,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);

    function submit(e){
        e.preventDefault();
        console.log(dados);
        
    }

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

            <div className={style.formGroupPassword}>
                
                <div className={style.passwordWrapper}>
                    <Input
                        type={showSenha ? 'text' : 'password'}
                        text="Senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                        value={dados.senha}
                        customClass="inputSenha"
                        
                    />
                    <span
                        className={style.toggleVisibility}
                        onClick={() => setShowSenha(!showSenha)}
                    >
                        
                    </span>
                </div>
            </div>

            <div className={style.formGroupPassword}>
                
                <div className={style.passwordWrapper}>
                    <Input
                        type={showConfirmSenha ? 'text' : 'password'}
                        text="Confirme sua senha"
                        name="confirmacaoSenha"
                        placeholder="Confirme sua senha"
                        handleOnChange={handleChange}
                        value={dados.confirmacaoSenha}
                        customClass="inputSenha"
                        
                    />
                    <span
                        className={style.toggleVisibility}
                        onClick={() => setShowConfirmSenha(!showConfirmSenha)}
                    >
                        
                    </span>
                </div>
            </div>

            <div className={style.checkboxContainer}>
                <input
                    type="checkbox"
                    name="aceitarTermos"
                    checked={dados.aceitarTermos}
                    onChange={handleChange}
                />
                <label>Eu concordo com todos os <a href="#" className={style.termo}>Termos</a> e <a href="#"  className={style.termo}>Políticas de Privacidade</a></label>
            </div>

            
            <Submit text={txtBtn} customClass="btnCriaConta"/>
            <p className={style.loginLink}>Já possui uma conta? <a href="#">Login</a></p>

            <div className={style.divider}>Ou faça login com</div>

            <button className={style.googleLogin}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
            </button>
            
        </form>
    )
}