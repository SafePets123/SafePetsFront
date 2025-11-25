import React, { useEffect, useState } from "react";
import DenunciasRecebidas from "../components/DenunciasRecebidas";
import "../dashboard.css";
import "../style.css";

const DashboardAutoridade: React.FC = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    imagem: "",
  });

  const [paginaAtual, setPaginaAtual] = useState("inicio");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName && storedEmail) {
      fetch(`https://safepetsback.onrender.com/orgao/${storedEmail}` )
        .then((res) => res.json())
        .then((data) => {
          setUsuario({
            nome: data.nome || storedName,
            email: data.email || storedEmail,
            imagem: data.imagem || "",
          });
        })
        .catch(() => {
          setUsuario({ nome: storedName, email: storedEmail, imagem: "" });
        });
    } else {
      setUsuario({ nome: storedName || "Autoridade Desconhecida", email: storedEmail || "sem-email", imagem: "" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/entrar";
  };

  const getInicial = (nome: string) => nome.charAt(0).toUpperCase();

  const renderConteudo = () => {
    switch (paginaAtual) {
      case "inicio":
        return (
          <>
            <h2>Bem-vindo(a), {usuario.nome.split(" ")[0]}!</h2>
            <p>Acompanhe e gerencie denúncias enviadas pelos usuários.</p>
            <div className="dash-cards">
              <div className="dash-card">
                <h3>📋 Denúncias Recebidas</h3>
                <p>Veja todas as denúncias em aberto e seus status.</p>
                <button onClick={() => setPaginaAtual("denuncias-recebidas")}>
                  Ver Denúncias
                </button>
              </div>

              <div className="dash-card">
                <h3>🔍 Analisar Casos</h3>
                <p>Investigue e registre atualizações de cada ocorrência.</p>
                <button onClick={() => setPaginaAtual("analisar-casos")}>
                  Analisar
                </button>
              </div>

              <div className="dash-card">
                <h3>📨 Comunicar ONG</h3>
                <p>Encaminhe casos diretamente para ONGs parceiras.</p>
                <button onClick={() => setPaginaAtual("comunicar-ong")}>
                  Enviar
                </button>
              </div>
            </div>
          </>
        );
      case "denuncias-recebidas":
        return <DenunciasRecebidas />;
      case "ajuda":
        return (
          <>
            <h2>📞 Suporte</h2>
            <p>Precisa de ajuda? Entre em contato com a equipe técnica.</p>
            <ul>
              <li>Email: suporte@safepets.com</li>
              <li>Telefone: (11) 99999-9999</li>
            </ul>
          </>
        );
      default:
        return <h2>Página não encontrada.</h2>;
    }
  };

  return (
    <div className="dashboard-denunciante">
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img src="/logo.png" alt="Logo" className="logo-icon" />
          </div>
        </div>
      </header>

      <div className="dash-container">
        <aside className="dash-sidebar">
          <nav>
            <ul>
              <li onClick={() => setPaginaAtual("inicio")}>🏠 Início</li>
              <li onClick={() => setPaginaAtual("denuncias-recebidas")}>📋 Denúncias Recebidas</li>
              <li onClick={() => setPaginaAtual("ajuda")}>📞 Ajuda</li>
            </ul>
          </nav>

          <div className="dash-user">
            {usuario.imagem ? (
              <img src={usuario.imagem} alt="Perfil" className="user-avatar" />
            ) : (
              <div className="user-avatar-fallback">{getInicial(usuario.nome)}</div>
            )}
            <div className="user-info">
              <p className="user-name">{usuario.nome}</p>
              <p className="user-email">{usuario.email}</p>
              <button onClick={handleLogout} className="logout-btn">
                Sair
              </button>
            </div>
          </div>
        </aside>

        <main className="dash-content">{renderConteudo()}</main>
      </div>
    </div>
  );
};

export default DashboardAutoridade;
