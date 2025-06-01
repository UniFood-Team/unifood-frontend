import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import style from './ExcluirProduto.module.css';

export default function ExcluirProduto({ visible, onHide, produto }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://sua-api.com/produtos/${produto.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Sucesso ao deletar
                console.log("Produto deletado com sucesso");
                onHide();
            } else {
                // Erro ao deletar
                console.error("Erro ao deletar produto");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <Dialog
            header={`Apagar o produto "${produto?.nome}"?`}
            visible={visible}
            onHide={onHide}
            style={{ width: '35rem' }}
            modal
            closable
        >
            <div className={style.content}>
                <p className={style.apagando}>Você está apagando o produto <strong>{produto?.nome}</strong>.</p>
                <p className={style.apagar}>Tem certeza que deseja apagar?</p>
            </div>

            <div className={style.footer}>
                <Button label="Cancelar"
                    className="p-button-text" 
                    onClick={onHide} 
                    style={{marginTop:'10px', height:'30px'}} />
                    
                <Button label="Sim, deletar" 
                    className="p-button-danger" 
                    onClick={handleDelete} 
                    style={{marginTop:'10px', height:'30px'}} />
            </div>
        </Dialog>
    );
}
