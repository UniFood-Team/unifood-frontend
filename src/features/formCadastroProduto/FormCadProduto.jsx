import { Dialog } from 'primereact/dialog';
import { InputText, InputNumber, Dropdown, InputTextarea, FileUpload, Button } from 'primereact/*';
import { useState } from 'react';

import style from "./FormCadProduto.module.css"

export default function FormCadProduto({ visible, onHide, onSave }) {
  const [produto, setProduto] = useState({ nome: '', preco: null, categoria: null, descricao: '', imagem: null });

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

  const salvar = () => {
    onSave(produto);
    onHide();
  };

  return (
    <Dialog header="Criar Produto" visible={visible} onHide={onHide} style={{ width: '40vw' }} modal>
      <div className={style.containerForm}>

        <label>Nome</label>
        <div className={style.nome}>
            <InputText
                value={produto.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)} 
            />
        </div>

        
        <div className={style.precoEcategorias}>
            <label htmlFor="inputnumber">Preço</label>
            <div className={style.preco}>
                <InputNumber
                    value={produto.preco} 
                    onValueChange={(e) => handleInputChange('preco', e.value)} 
                    mode="currency" 
                    currency="BRL" 
                    locale="pt-BR"
                />
            </div>
            <label htmlFor="inputnumber">Categoria</label>
            <div className={style.categorias}>
                <Dropdown
                    value={produto.categoria} 
                    options={categorias} 
                    onChange={(e) => handleInputChange('categoria', e.value)} 
                    placeholder="Selecione uma categoria"
                />
            </div>
            
            
        </div>

        <label>Descrição</label>
        <div className={style.descricao}>
            <InputTextarea
                value={produto.descricao} 
                onChange={(e) => handleInputChange('descricao', e.target.value)} 
                rows={4}
            />
        </div>

        <label>Imagem</label>
        <div className={style.imagem}>
            <FileUpload
                mode="basic" 
                auto 
                chooseLabel="Selecionar Imagem" 
                accept="image/*"
                customUpload
                uploadHandler={(e) => handleInputChange('imagem', e.files[0])}
            />
        </div>
        
      </div>
      <Button label="Salvar" onClick={salvar} />
    </Dialog>
  );
}
