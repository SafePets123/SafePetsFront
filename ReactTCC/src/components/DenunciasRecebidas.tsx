// Arquivo: DenunciasRecebidas.tsx

import React, { useEffect, useState } from "react";
// Importa o novo card para a autoridade
import DenunciaCardAutoridade from "./DenunciaCardAutoridade"; 

// Interfaces de dados
interface DenunciaParaCard {
  _id: string;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao: string;
  local: string; // Adicionado para o novo card
}

interface DenunciaBackend {
  denun_cod: number; 
  denun_data: string;
  denun_descricao: string;
  denun_status: string;
  denun_tipo_animal: string;
  denun_local: string; // Campo do backend
}

const DenunciasRecebidas: React.FC = () => {
  const [denuncias, setDenuncias] = useState<DenunciaParaCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token de autenticação não encontrado. Faça login novamente.");
          setLoading(false);
          return;
        }
        
        // URL CORRETA para buscar TODAS as denúncias
        const API_URL = "https://safepetsback.onrender.com/denuncias/todas";
        
        const response = await fetch(API_URL, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        } );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro HTTP: ${response.status} - ${errorData.erro || 'Falha ao buscar denúncias.'}`);
        }

        const data: DenunciaBackend[] = await response.json();
        
        // Mapeamento de Backend para o formato do Card
        const mappedDenuncias: DenunciaParaCard[] = data.map((d) => ({
            _id: d.denun_cod.toString(), 
            titulo: `Denúncia #${d.denun_cod} - ${d.denun_tipo_animal}`, 
            descricao: d.denun_descricao,
            status: d.denun_status || 'Em Análise',
            dataCriacao: d.denun_data, 
            local: d.denun_local, // Mapeando o local
        }));

        setDenuncias(mappedDenuncias);
      } catch (err: any) {
        console.error("Erro ao buscar denúncias:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDenuncias();
  }, []); 

  if (loading) {
    return <p className="loading-message">Carregando denúncias...</p>;
  }

  if (error) {
    return <p className="error-message">Erro ao carregar denúncias: {error}</p>;
  }

  return (
    <div className="denuncias-recebidas-container">
      <h2>📋 Denúncias Recebidas e Pendentes</h2>
      {denuncias.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma denúncia recebida ou pendente no momento.</p>
        </div>
      ) : (
        <div className="denuncias-list">
          {denuncias.map((denuncia) => (
            // Usando o novo card
            <DenunciaCardAutoridade key={denuncia._id} denuncia={denuncia} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DenunciasRecebidas;
