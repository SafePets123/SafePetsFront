import React, { useState, useEffect } from "react";
import "../dashboard.css";
import "../style.css";

// Importa os componentes existentes
import Inicio from "../components/Inicio"; 
import Ajuda from "../components/Ajuda";
import MinhasDenuncias from "../components/MinhasDenuncias";
import Denuncie from "../pages/denuncie";
import { useNavigate } from "react-router-dom";
import PerfilUsuario from "../components/PerfilUsuario"; 

const DashboardDenunciante: React.FC = () => {
  const navigate = useNavigate();
  const [paginaAtual, setPaginaAtual] = useState("inicio");
  const [usuario, setUsuario] = useState({ nome: "", email: "" });

  useEffect(() => {
    const nome = localStorage.getItem("userName") || "Usuário";
    const email = localStorage.getItem("userEmail") || "email@exemplo.com";
    setUsuario({ nome, email });

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/entrar");
  };

  const renderConteudo = () => {
    switch (paginaAtual) {
      case "inicio": return <Inicio setPaginaAtual={setPaginaAtual} />;
      case "minhas-denuncias": return <MinhasDenuncias />;
      case "nova-denuncia": return <Denuncie />;
      case "perfil": return <PerfilUsuario />;
      case "ajuda": return <Ajuda />;
      default: return <Inicio setPaginaAtual={setPaginaAtual} />;
    }
  };

  return (
    <div className="dashboard-denunciante">
      <header className="dash-header">
        <div className="dash-logo">
          <img src="/logo.png" alt="SafePets Logo" className="logo-icon" />
        </div>
      </header>

      <div className="dash-container">
        <aside className="dash-sidebar">
          <nav id="sidebar-scroll">
            <ul>
              <li onClick={() => setPaginaAtual("inicio")}>🏠 Início</li>
              <li onClick={() => setPaginaAtual("minhas-denuncias")}>📋 Minhas Denúncias</li>
              <li onClick={() => setPaginaAtual("nova-denuncia")}>➕ Nova Denúncia</li>
              <li onClick={() => setPaginaAtual("perfil")}>👤 Perfil</li>
              <li onClick={() => setPaginaAtual("ajuda")}>📞 Ajuda</li>
            </ul>
          </nav>

          <div className="dash-user">
            <div className="user-avatar-fallback">{usuario.nome.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <p className="user-name">{usuario.nome}</p>
              <p className="user-email">{usuario.email}</p>
              <button onClick={handleLogout} className="logout-btn">Sair</button>
            </div>
          </div>
        </aside>

        <main className="dash-content">{renderConteudo()}</main>
      </div>
    </div>
  );
};

export default DashboardDenunciante;
