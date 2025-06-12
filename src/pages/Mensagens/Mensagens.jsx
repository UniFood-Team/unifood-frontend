// ChatMensagens.jsx
import { useState } from "react";
import NavBarraTop from "../../components/layout/navBarraTop/NavBarraTop";
import NavBarraSide from "../../components/layout/navBarraSide/NavBarraSide";
import styles from "./Mensagens.module.css";

export default function ChatMensagens() {
  const [mensagens, setMensagens] = useState([
    {
      autor: "cliente",
      texto: "Oi! Vocês têm bolo de cenoura hoje?",
      hora: "14:02",
    },
    {
      autor: "vendedor",
      texto: "Olá! Sim, temos bolo de cenoura fresquinho 😊",
      hora: "14:03",
    },
  ]);
  const [novaMensagem, setNovaMensagem] = useState("");

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "") return;
    const nova = {
      autor: "cliente",
      texto: novaMensagem,
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMensagens([...mensagens, nova]);
    setNovaMensagem("");
  };

  const lidarComTecla = (e) => {
    if (e.key === "Enter") enviarMensagem();
  };

  return (
    <div className={styles.containerChat}>
      <NavBarraSide />
      <div className={styles.mainContent}>
        <NavBarraTop />
        <main className={styles.chatContainer}>
          <div className={styles.chatHeader}>Conversa com Vendedor</div>

          <div className={styles.historicoMensagens}>
            {mensagens.map((msg, i) => (
              <div
                key={i}
                className={`${styles.mensagem} ${
                  msg.autor === "cliente" ? styles.cliente : styles.vendedor
                }`}
              >
                <div className={styles.balao}>{msg.texto}</div>
                <span className={styles.hora}>{msg.hora}</span>
              </div>
            ))}
          </div>

          <div className={styles.areaInput}>
            <input
              type="text"
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              onKeyDown={lidarComTecla}
              placeholder="Digite sua mensagem..."
              className={styles.inputMensagem}
            />
            <button onClick={enviarMensagem} className={styles.botaoEnviar}>
              Enviar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
