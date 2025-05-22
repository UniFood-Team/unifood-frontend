import styles from './MeusProdutos.module.css';
import NavBarraSide from '../../../components/layout//navBarraSide/NavBarraSide';
import NavBarraTop from '../../../components/layout/navBarraTop/NavBarraTop';   
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useState } from 'react';

export default function MeusProdutos() {
  const [showForm, setShowForm] = useState(false); // controla visibilidade do modal
  
  const salvarProduto = (produto) => {
    console.log('Produto salvo:', produto);
  };

  return (
    <div className={styles.layout}>
      <NavBarraSide/>
      <div className={styles.mainContent}>
        <NavBarraTop/>
        <div className={styles.contprodutos}>
          <div className={styles.submit}>
            <h2>Meus Produtos</h2>
            <Button label="Criar Produto" icon="pi pi-plus-circle" className={styles.botaoCustomizado}/>
          </div>
          <div className={styles.table}>
            <DataTable className={styles.dataTable}>
              <Column field="Nome do Produto" header="Code"></Column>
              <Column field="Descrição" header="Descrição"></Column>
              <Column field="Preço" header="Preço"></Column>
              <Column field="Última atualização" header="Última atualização"></Column>
              <Column field="Ações" header="Ações"></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <FormCadProduto
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={salvarProduto}
      />
    </div>
  );
}
