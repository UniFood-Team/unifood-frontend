import style from './CardViewProduct.module.css'

import { useState } from 'react';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { BsThreeDots } from "react-icons/bs";

import CardEditDelete from '../cardEditDelete/CardEditDelete';

export default function CardMeusProdutos({ produtos }) {
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const [position, setPosition] = useState({ top: 0, left: 0 });

    function abrirModalProduto(produto, event) {
        const rect = event.currentTarget.getBoundingClientRect();// Obtém as coordenadas do botão clicado

        setPosition({
            top: rect.bottom + window.scrollY-50,
            left: rect.left + window.scrollX - 150,
        });
        console.log("Abrindo modal para produto ID:", produto.id);
        setProdutoSelecionado(produto); //produto passado para o CardEditDelete
    }

    return (
        <div className={style.table}>
            <DataTable value={produtos} className={style.dataTable} scrollable scrollHeight="350px" responsiveLayout="scroll">
                <Column field="nome" header="Nome do Produto" style={{ width: '200px' }} />
                <Column field="descricao" header="Descrição" style={{ width: '450px' }} />
                <Column 
                    field="preco" 
                    header="Preço (R$)" 
                    style={{ width: '150px' }} 
                    body={(row) => (
                        <div className={style.precoWrapper}>
                            <span className={style.origem}>R$</span>{row.preco.toFixed(2)}
                        </div>
                    )} 
                />
                <Column field="ultimaAtualizacao" header="Última atualização" style={{ width: '200px' }} />
                <Column 
                    header="Ações" 
                    style={{ width: '120px' }} 
                    body={(rowData) => (
                        <div 
                            className={style.acoesWrapper} 
                        >
                            <div 
                                className={style.edit_save} 
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita conflitos de clique
                                    abrirModalProduto(rowData, e);
                                }}
                               
                            >
                                <BsThreeDots />
                            </div>
                        </div>
                    )} 
                />

            </DataTable>

            <CardEditDelete
                visible={!!produtoSelecionado} // Só renderiza o card se houver um produto selecionado
                onHide={() => {
                    console.log("Fechando modal para produto ID:", produtoSelecionado?.id)
                    setProdutoSelecionado(null) // Esconde o card
                }}
                produto={produtoSelecionado}
                position={position}
            />
        </div>
    );
}
