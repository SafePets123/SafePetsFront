import React, { useState, useEffect } from "react";

interface InicioDenuncianteProps {
  setPaginaAtual: (pagina: string) => void;
}

const InicioDenunciante: React.FC<InicioDenuncianteProps> = ({ setPaginaAtual }) => {
  const [nome, setNome] = useState("Usuário");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      // Capitaliza a primeira letra do nome
      setNome(storedName.charAt(0).toUpperCase() + storedName.slice(1).toLowerCase());
    }
  }, []);

  return (
    <>
      <h2>Bem-vindo(a), {nome}!</h2>
      <p>Use o menu lateral para gerenciar suas denúncias e atualizar seu perfil.</p>

      <div className="dash-cards">
        {/* CARD 1: Minhas Denúncias */}
        <div className="dash-card">
          <h3>📋 Minhas Denúncias</h3>
          <p>Visualize o status e o histórico de todas as denúncias que você registrou.</p>
          <button onClick={() => setPaginaAtual("minhas-denuncias")}>Ver Histórico</button>
        </div>

        {/* CARD 2: Nova Denúncia */}
        <div className="dash-card">
          <h3>➕ Nova Denúncia</h3>
          <p>Registre um novo caso de maus-tratos ou situação de risco para um animal.</p>
          <button onClick={() => setPaginaAtual("nova-denuncia")}>Denunciar Agora</button>
        </div>
      </div>
    </>
  );
};

export default InicioDenunciante;