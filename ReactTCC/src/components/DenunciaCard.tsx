import React from 'react';
import '../DenunciaCard.css';

interface DenunciaCardProps {
  denuncia: {
    _id: string;
    titulo: string;
    descricao: string;
    status: string;
    dataCriacao: string;
  };
}

const DenunciaCard: React.FC<DenunciaCardProps> = ({ denuncia }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="denuncia-card">
      <h3>{denuncia.titulo}</h3>
      <p><strong>Descrição:</strong> {denuncia.descricao}</p>
      <p><strong>Status:</strong> <span className={`status-${denuncia.status.toLowerCase().replace(/ /g, '-')}`}>{denuncia.status}</span></p>
      <p><strong>Data de Criação:</strong> {formatDate(denuncia.dataCriacao)}</p>
    </div>
  );
};

export default DenunciaCard;
