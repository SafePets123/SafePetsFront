import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DenunciasRecebidas.css'; // Crie um arquivo CSS para estilização

// Interface para tipagem dos dados da denúncia
interface Denuncia {
  denun_cod: number;
  den_cod: number;
  dep_cod: number;
  denun_local: string;
  denun_hora: string;
  denun_data: string;
  denun_endereco: string;
  denun_tipo_animal: string;
  denun_descricao: string;
  denun_telefone: string | null;
  denun_midia_url: string | null;
  denun_status: string;
  denun_criado_em: string;
}

const DenunciasRecebidas: React.FC = () => {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para buscar as denúncias na API
  const fetchDenuncias = async () => {
    setLoading(true);
    setError(null);
    
    // O token JWT deve ser obtido do localStorage ou de um contexto de autenticação
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      setError('Usuário não autenticado. Redirecionando para o login...');
      setTimeout(() => navigate('/entrar'), 2000);
      return;
    }

    try {
      // ATENÇÃO: Ajuste a URL e a porta conforme a sua configuração de rotas
      const response = await fetch('https://safepetsfront.onrender.com/denuncias', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Envio do Token JWT
        },
      });

      if (response.ok) {
        const data: Denuncia[] = await response.json();
        setDenuncias(data);
      } else {
        const errorData = await response.json();
        setError(`Erro ao carregar denúncias: ${errorData.erro || response.statusText}`);
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError('Falha ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDenuncias();
  }, []);

  if (loading) {
    return <div className="denuncias-container">Carregando denúncias...</div>;
  }

  if (error) {
    return <div className="denuncias-container error-message">{error}</div>;
  }

  return (
    <div className="denuncias-container">
      <h2>Denúncias Recebidas</h2>
      <p>Total de denúncias: {denuncias.length}</p>
      
      {denuncias.length === 0 ? (
        <p>Nenhuma denúncia encontrada.</p>
      ) : (
        <div className="denuncias-list">
          {denuncias.map((denuncia) => (
            <div key={denuncia.denun_cod} className={`denuncia-card status-${denuncia.denun_status.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="denuncia-header">
                <h3>Denúncia #{denuncia.denun_cod} - {denuncia.denun_tipo_animal}</h3>
                <span className="denuncia-status">{denuncia.denun_status}</span>
              </div>
              <p><strong>Local:</strong> {denuncia.denun_local} ({denuncia.denun_endereco})</p>
              <p><strong>Data/Hora:</strong> {new Date(denuncia.denun_data).toLocaleDateString()} às {denuncia.denun_hora}</p>
              <p><strong>Descrição:</strong> {denuncia.denun_descricao.substring(0, 150)}...</p>
              <p><strong>Contato:</strong> {denuncia.denun_telefone || 'Não fornecido'}</p>
              {denuncia.denun_midia_url && (
                <a href={denuncia.denun_midia_url} target="_blank" rel="noopener noreferrer">Ver Mídia Anexada</a>
              )}
              <button onClick={() => navigate(`/analisar-caso/${denuncia.denun_cod}`)} className="analisar-btn">
                Analisar Caso
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DenunciasRecebidas;