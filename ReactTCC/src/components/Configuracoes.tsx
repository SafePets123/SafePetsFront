import React from "react";

const Configuracoes: React.FC = () => {
  return (
    <div className="configuracoes-container">
      <h2>⚙️ Configurações</h2>
      <p>Esta é a tela de configurações padrão para todos os usuários.</p>
      <p>Funcionalidades futuras podem incluir:</p>
      <ul>
        <li>Alterar senha</li>
        <li>Preferências de notificação</li>
        <li>Gerenciar privacidade</li>
      </ul>
      <p>Por enquanto, não há configurações específicas para ajustar aqui.</p>
    </div>
  );
};

export default Configuracoes;

