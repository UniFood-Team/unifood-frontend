import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { TiDelete } from "react-icons/ti";


import { useState } from 'react';


import style from "./CadProduto.module.css"


export default function FormCadProduto({ visible, onHide, onSave }) {

    //estado inicial dos dados
    const PRODUTO_INICIAL = {
        nome: '',
        preco: null,
        categoria: null,
        descricao: '',
        imagem: null
    };

    const [produto, setProduto] = useState(PRODUTO_INICIAL);
    const [loading, setLoading] = useState(false); // Estado para indicar carregamento

    const categorias = [
        { label: 'Refeições', value: 'refeições' },
        { label: 'Lanches', value: 'lanches' },
        { label: 'Doces e Sobremesas', value: 'Doces e Sobremesas' },
        { label: 'Bebidas', value: 'bebidas' },
        { label: 'Alimentos Saudáveis', value: 'Alimentos Saudáveis' },
        { label: 'Combos e Kits', value: 'Combos e Kits' },
        { label: 'Outros', value: 'outros' },
        ];

    const handleInputChange = (field, value) => {
        setProduto(prev => ({ ...prev, [field]: value }));
    };


    //função para fazer integração com api no envio dos dados
    const submit = async () => {
        setLoading(true); // Ativa o estado de carregamento antes da requisição

        try {
            const formData = new FormData(); // Cria um FormData para envio de dados multipart (inclui arquivos)
            formData.append('nome', produto.nome); 
            formData.append('preco', String(produto.preco));
            formData.append('categoria', produto.categoria); 
            formData.append('descricao', produto.descricao); 
            formData.append('imagem', produto.imagem); // Adiciona imagem (tipo File), necessário FormData

            const response = await fetch('http://localhost:3001/api/produtos', {
            method: 'POST',
            body: formData, // Envia o corpo como FormData (não precisa de Content-Type)
            });

            if (!response.ok) throw new Error('Erro ao cadastrar produto'); // Verifica erro de resposta HTTP (ex: 400 ou 500)

            const data = await response.json();
            setProduto(PRODUTO_INICIAL);//inicializa o estado dos dados 
            onSave(data); // Chama callback para salvar o produto no estado/pai
            onHide(); // Fecha o modal
        } catch (error) {
            console.error(error); // Loga erro no console
            alert("Erro ao cadastrar o produto. Verifique os dados e tente novamente."); 
        } finally {
            setLoading(false); // Finaliza carregamento, independentemente do sucesso ou erro
        }
    };

    const handleHide = () => {
        setProduto(PRODUTO_INICIAL);
        onHide();
    };

    const handleImageUpload = (e) => {
        const file = e.files[0];
        if (!file.type.startsWith("image/")) {
            alert("Apenas arquivos de imagem são permitidos.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB
            alert("A imagem não pode exceder 2MB.");
            return;
        }
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            alert('Apenas arquivos .jpg e .png são permitidos.');
            return;
        }
        handleInputChange('imagem', file);
    };


    const formularioValido =  produto.nome.trim() !== '' && produto.preco !== null &&
        produto.categoria !== null && produto.descricao.trim() !== '' && produto.imagem !== null;

    return (
        <Dialog header="Cadastrar produto" visible={visible} onHide={handleHide}  modal
            footer={
                //passando o footer diretamnete no componente
                //botões de cancelar e cadastrar
                <div className={style.botoes}>
                <Button
                    className={`${style.botaoCancelar} p-button`}
                    label="Cancelar"
                    onClick={() => {
                        setProduto(PRODUTO_INICIAL); // limpa ao cancelar
                        onHide();
                    }}

                />
                <Button
                    label={loading ? "Salvando..." : "Cadastrar"}
                    onClick={submit}
                    className={`${style.botaoCadastrar} p-button`}
                    disabled={!formularioValido || loading}
                />
                </div>
            }>

            <div className={style.containerForm}>
                <div className={style.nome}>
                    <label htmlFor="nome" >
                        Nome
                        <span className={style.astec}>*</span>
                    </label>
                    <InputText
                        id='nome'
                        name='nome'
                        value={produto.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)} 
                        placeholder="Insira o nome do produto"
                    />
                </div>

                
                <div className={style.precoEcategorias}>
                    <div className={style.preco}>
                        <label >
                            Preço
                            <span className={style.astec}>*</span>
                        </label>
                        <InputNumber
                           
                            name='preco'
                            value={produto.preco} 
                            onValueChange={(e) => handleInputChange('preco', e.value)} 
                            mode="currency" 
                            currency="BRL" 
                            locale="pt-BR"
                            placeholder="Inserir preço"
                        />
                    </div>
                
                    <div className={style.categorias}>
                        <label >
                            Categoria
                            <span className={style.astec}>*</span>
                        </label>
                        <Dropdown
                            id='categoria'
                            name='categoria'
                            value={produto.categoria} 
                            options={categorias} 
                            onChange={(e) => handleInputChange('categoria', e.value)} 
                            placeholder="Selecionar"
                            className={style.dropdown}
                            
                        />
                    </div>
                </div>

                
                <div className={style.descricao}>
                    <label htmlFor="descricao" >
                        Descrição do produto
                        <span className={style.astec}>*</span>
                    </label>
                    <InputTextarea
                        id='descricao'
                        value={produto.descricao} 
                        onChange={(e) => handleInputChange('descricao', e.target.value)} 
                        rows={1}
                        placeholder="Insira uma breve descrição do produto que ajude a indetifica-lo"
                    />
                </div>

                
                <div className={style.imagem}>
                    <label >
                        Anexo da imagem do produto
                        <span className={style.astec}>*</span>
                    </label>


                    {!produto.imagem && ( //verifica upload de imagem
                        <FileUpload
                            key={produto.imagem ? 'with-image' : 'no-image'}
                            id="imagem"
                            name="imagem"
                            mode="basic"
                            auto
                            chooseLabel="Insira uma imagem (.jpg ou .png) do produto"
                            accept="image/*"
                            customUpload
                            uploadHandler={handleImageUpload}
                            className={style.imgForm}
                        />
                    )}
                    {produto.imagem && (
                        <div className={style.uploadComImagem}>
                            <span className={style.nomeImagem}>{produto.imagem.name}</span>
                            <button
                                type="button"
                                onClick={() => handleInputChange('imagem', null)}
                                className={style.botaoRemover}
                                aria-label="Remover imagem"
                            >
                            <TiDelete className={style.remove}/>

                            </button>
                        </div>
                    )}
                    
                </div>
            </div>
            
        </Dialog>
    );
}
