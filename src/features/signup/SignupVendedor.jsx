import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

import style from "./SignupVendedor.module.css"

import Input from "../../components/form/input/Input"
import Submit from "../../components/form/submit/Submit"

/* componente para selecionar forma de pagamento*/
import { Dropdown } from 'primereact/dropdown';

/*icone de mostrar senha*/
import { FaEye, FaEyeSlash } from 'react-icons/fa';




export default function Signup({txtBtn}){

    const [dados, setDados] = useState({nome:'', sobrenome:'', email:'', telefone:'', senha:'', confirmacaoSenha:'',nomeEstabelecimento: '',contato:'', aceitarTermos:'', formaPagamento: ''})
    //const navigate = useNavigate();

     /* manipulador genérico de mudanças de inputo*/
    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setDados({
            ...dados,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const [senha, setSenha] = useState(false);
    const [confirmSenha, setConfirmSenha] = useState(false);

    function validarFormulario(dados) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (Object.entries(dados).some(([key, val]) =>
            key !== 'aceitarTermos' && key !== 'formaPagamento' && !val)) {
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

    // função para submeter o formualrio
    function submit(e){

        e.preventDefault();
         console.log("testando")
        // Validação básica 
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


    /* opções de itens de pagamento*/
    const items = [
        { label: 'Pix', value: 'pix' },
        { label: 'Cartão', value: 'cartao' },
        { label: 'Dinheiro', value: 'dinheiro' },
        { label: 'Todos', value: 'todos' }
    ];

    return (
        <form className={style.formCadastro} onSubmit={submit}>
            <h2 className={style.titulo}>Cadastre-se</h2>
            <p className={style.subtitulo}>Vamos preparar tudo para que você possa acessar sua conta pessoal.</p>
            <h4 className={style.subtituloAcesso}>Acesso do vendedor</h4>
             {/* dados do usuario*/}
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
                    {/* Vizualizar senha*/}
                    <span
                        className={style.vizuSenha}
                        onClick={() => setConfirmSenha(!confirmSenha)}
                        style={{ cursor: 'pointer' }}
                    >
                        {confirmSenha ? <FaEyeSlash className={style.iconVizu}/> : <FaEye className={style.iconVizu}/>}
                    </span>
                </div>
            </div>

            
            {/* Dados do estabelecimento*/}
            <h4 className={style.subtituloAcesso}> Dados do estabelecimento</h4>

            <div className={style.formRow}>
                <Input
                    type="text"
                    text="Nome do Estabelecimento"
                    name="nomeEstabelecimento"
                    placeholder="Digite o nome"
                    handleOnChange={handleChange}
                    value={dados.nomeEstabelecimento} 
                    customClass="inputInfoBasicas"
                />
                <Input
                    type="tel"
                    text="Telefone para contato"
                    name="contato"
                    placeholder="(92) 00000-0000"
                    handleOnChange={handleChange}
                    value={dados.contato}
                    customClass="inputInfoBasicas"
                />
            </div>

            <div className={style.selectItem}>
                <label htmlFor="pag" className={style.labelPagamento}>Preferência de pagamento</label>
                <Dropdown 
                    value={dados.formaPagamento}
                    onChange={(e) => setDados({...dados, formaPagamento: e.value})}
                    options={items} 
                    virtualScrollerOptions={{ itemSize: 38 }}
                    className={style.dropdown}
                />
            </div>

            {/* Dados complementares*/}
            <div className={style.checkboxContainer}>
                <Input
                    type="checkbox"
                    name="aceitarTermos"
                    checked={dados.aceitarTermos}
                   handleOnChange={handleChange}
                    customClass={style.checkedinput}
                />
                <label>Eu concordo com todos os <a href="#" className={style.termo}>Termos
                </a> e <a href="#"  className={style.termo}>Políticas de Privacidade</a></label>
            </div>
            
            
            <Submit text={txtBtn} customClass="btnCriaConta" />

            <p className={style.loginLink}>Já possui uma conta? <a href="#">Login</a></p>

        </form>
    )
}