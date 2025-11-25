import React from 'react';
import './DenunciaCardAutoridade.css'; // Importa o CSS

// Interface de dados (adaptada da DenunciaParaCard)
interface DenunciaCardProps {
  denuncia: {
    _id: string;
    titulo: string; // Ex: Denúncia #9 - Cachorro
    descricao: string;
    status: string;
    dataCriacao: string;
    local: string; // Campo essencial para a autoridade
  };
}

const DenunciaCardAutoridade: React.FC<DenunciaCardProps> = ({ denuncia }) => {
  // Função auxiliar para formatar a data (se necessário)
  const formatarData = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dataString; // Retorna a string original se a formatação falhar
    }
  };

  return (
    <div className="denuncia-card-autoridade">
      <h3 className="card-titulo">{denuncia.titulo}</h3>
      
      <div className="card-info-group">
        <p className="card-label">Status:</p>
        <p className={`card-status status-${denuncia.status.toLowerCase().replace(/\s/g, '-')}`}>{denuncia.status}</p>
      </div>

      <div className="card-info-group">
        <p className="card-label">Localização:</p>
        <p className="card-local">{denuncia.local || 'Local não informado'}</p>
      </div>

      <div className="card-info-group full-width">
        <p className="card-label">Descrição Detalhada:</p>
        <p className="card-descricao">{denuncia.descricao}</p>
      </div>

      <p className="card-data-criacao">
        Registrada em: {formatarData(denuncia.dataCriacao)}
      </p>
      
      {/* Botão de Ação (Opcional, mas útil para a autoridade) */}
      <button className="card-action-btn">Analisar Caso</button>
    </div>
  );
};

export default DenunciaCardAutoridade;
