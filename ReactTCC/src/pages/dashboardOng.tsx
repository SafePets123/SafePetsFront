import React, { useEffect, useState } from "react";
import "../dashboard.css";
import "../style.css";

const DashboardOng: React.FC = () => {
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
      fetch(`https://safepetsback.onrender.com/ong/${storedEmail}`)
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
      setUsuario({ nome: storedName || "ONG Desconhecida", email: storedEmail || "sem-email", imagem: "" });
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
            <p>Gerencie seus abrigos, cadastre animais e veja solicitações de resgate.</p>
            <div className="dash-cards">
              <div className="dash-card">
                <h3>🐾 Cadastrar Animal</h3>
                <p>Adicione novos animais disponíveis para adoção.</p>
                <button onClick={() => setPaginaAtual("cadastrar-animal")}>
                  Cadastrar
                </button>
              </div>

              <div className="dash-card">
                <h3>🏡 Gerenciar Abrigos</h3>
                <p>Cadastre ou edite informações dos abrigos parceiros.</p>
                <button onClick={() => setPaginaAtual("gerenciar-abrigos")}>
                  Gerenciar
                </button>
              </div>

              <div className="dash-card">
                <h3>🚨 Solicitações</h3>
                <p>Veja pedidos de resgate enviados por denunciantes.</p>
                <button onClick={() => setPaginaAtual("solicitacoes")}>
                  Ver Solicitações
                </button>
              </div>
            </div>
          </>
        );

      case "cadastrar-animal":
        return <h2>🐾 Formulário para cadastrar novo animal.</h2>;
      case "gerenciar-abrigos":
        return <h2>🏡 Lista e edição de abrigos cadastrados.</h2>;
      case "solicitacoes":
        return <h2>⚙️ Configurações da conta da ONG.</h2>;
      case "ajuda":
        return (
          <>
            <h2>📞 Ajuda</h2>
            <p>Suporte técnico e informações de contato:</p>
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
              <li onClick={() => setPaginaAtual("cadastrar-animal")}>🐾 Cadastrar Animal</li>
              <li onClick={() => setPaginaAtual("gerenciar-abrigos")}>🏡 Gerenciar Abrigos</li>
              <li onClick={() => setPaginaAtual("solicitacoes")}>🚨 Solicitações</li>
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

export default DashboardOng;