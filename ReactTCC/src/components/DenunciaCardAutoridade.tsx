import React from 'react';
import './DenunciaCardAutoridade.css';


interface DenunciaCardProps {
  denuncia: {
    _id: string;
    titulo: string;
    descricao: string;
    status: string;
    dataCriacao: string;
    local: string;
  };
}

const DenunciaCardAutoridade: React.FC<DenunciaCardProps> = ({ denuncia }) => {
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
      return dataString;
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
      
      <button className="card-action-btn">Analisar Caso</button>
    </div>
  );
};

export default DenunciaCardAutoridade;
