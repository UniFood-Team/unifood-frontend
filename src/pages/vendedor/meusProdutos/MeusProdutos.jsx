import styles from './MeusProdutos.module.css';
import NavBarraSide from '../../../components/layout/navBarraSide/NavBarraSide';
import NavBarraTop from '../../../components/layout/navBarraTop/NavBarraTop';
import { Button } from 'primereact/button';

import { useState } from 'react';
import CadastroProduto from '../../../components/form/cadastroProduto/CadProduto';
import CardViewProduct from '../../../features/cardViewProduct/CardViewProduct';

export default function MeusProdutos() {
  const [showForm, setShowForm] = useState(false); // controla visibilidade do modal

  //TESTE: Estado de produtos com os dados iniciais
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Camiseta Básica',
      descricao: 'Camiseta de algodão 100% orgânico, disponível em várias cores.',
      preco: 49.9,
      ultimaAtualizacao: '25/05/2025 14:32',
    },
    {
      id: 2,
      nome: 'Tênis Esportivo',
      descricao: 'Tênis leve e confortável para corrida ou uso diário.',
      preco: 19.99,
      ultimaAtualizacao: '22/05/2025 09:10',
    },
    {
      id: 3,
      nome: 'Mochila Executiva',
      descricao: 'Mochila com compartimento para notebook e resistência à água.',
      preco: 59.75,
      ultimaAtualizacao: '20/05/2025 18:47',
    },
    {
      id: 4,
      nome: 'Tênis Esportivo',
      descricao: 'Tênis leve e confortável para corrida ou uso diário.',
      preco: 19.99,
      ultimaAtualizacao: '22/05/2025 09:10',
    },
    {
      id: 5,
      nome: 'Mochila Executiva',
      descricao: 'Mochila com compartimento para notebook e resistência à água.',
      preco: 59.75,
      ultimaAtualizacao: '20/05/2025 18:47',
    },
    {
      id: 6,
      nome: 'Tênis Esportivo',
      descricao: 'Tênis leve e confortável para corrida ou uso diário.',
      preco: 19.99,
      ultimaAtualizacao: '22/05/2025 09:10',
    },
    {
      id: 7,
      nome: 'Mochila Executiva',
      descricao: 'Mochila com compartimento para notebook e resistência à água.',
      preco: 59.75,
      ultimaAtualizacao: '20/05/2025 18:47',
    },
  ]);

  // Adiciona novo produto à lista
  const salvarProduto = (novoProduto) => {
    const produtoComData = {
      ...novoProduto,
      id: produtos.length + 1,
      ultimaAtualizacao: new Date().toLocaleString('pt-BR'),
    };

    setProdutos([...produtos, produtoComData]);
  };

  return (
    <div className={styles.layout}>
      <NavBarraSide />
      <div className={styles.mainContent}>
        <NavBarraTop />
        <div className={styles.contprodutos}>
          <div className={styles.submit}>
            <h2 className={styles.titulo}>Meus Produtos</h2>
            <Button 
              label="Criar Produto" 
              icon="pi pi-plus-circle" 
              className={styles.botaoCustomizado}
              onClick={() => setShowForm(true)}
            />
          </div>

          {/* Usa o estado real para mostrar produtos */}
          <CardViewProduct produtos={produtos} />
        </div>
      </div>

      {/* Modal de cadastro de produto */}
      <CadastroProduto
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={salvarProduto}
      />
    </div>
  );
}
