import React, { useState, useEffect } from 'react';

// Defina a interface do usuário (adapte conforme a sua estrutura real)
interface Usuario {
  nome: string;
  email: string;
  // Adicione outros campos do perfil que você queira exibir
}

const PerfilUsuario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Carregar dados do localStorage (ou fazer uma chamada à API)
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName && storedEmail) {
      setUsuario({
        nome: storedName,
        email: storedEmail,
      });
    }
    
    // 2. Simulação de carregamento (remova se for fazer chamada à API)
    setLoading(false);

    // Se você for buscar dados completos do perfil no backend,
    // a lógica de fetch deve ser adicionada aqui, usando o token.

  }, []);

  if (loading) {
    return <div className="dashboard-content-page">Carregando Perfil...</div>;
  }

  if (!usuario) {
    return <div className="dashboard-content-page">Erro ao carregar dados do perfil.</div>;
  }

  return (
    <div className="dashboard-content-page perfil-container">
      <h1>👤 Meu Perfil</h1>
      
      <div className="perfil-info">
        <p><strong>Nome Completo:</strong> {usuario.nome}</p>
        <p><strong>E-mail:</strong> {usuario.email}</p>
        {/* Adicione mais informações do perfil aqui */}
      </div>

      <button className="btn-editar-perfil">Editar Informações</button>
    </div>
  );
};

export default PerfilUsuario;
