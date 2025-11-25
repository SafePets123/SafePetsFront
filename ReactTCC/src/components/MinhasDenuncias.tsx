import React, { useEffect, useState } from "react";
import DenunciaCard from "./DenunciaCard";

// 1. Interface para o DenunciaCard (Formato que o Card espera)
interface DenunciaParaCard {
  _id: string;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao: string;
}

// 2. Interface para os dados que vêm do Backend (Formato CORRETO do seu banco)
interface DenunciaBackend {
  denun_cod: number; // <--- CORREÇÃO: Incluído para resolver o erro de compilação
  denun_data: string;
  denun_descricao: string;
  denun_status: string;
  denun_tipo_animal: string;
  denun_local: string;
  // Inclua aqui quaisquer outros campos que o seu endpoint /denuncias/minhas retorne
}

// O componente não precisa mais da prop userId, pois o ID é extraído do token no backend
const MinhasDenuncias: React.FC = () => {
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
        
        const response = await fetch("https://safepetsfront.onrender.com/denuncias/minhas", {
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
        
        // 3. Mapeamento de Backend para o formato do Card
        const mappedDenuncias: DenunciaParaCard[] = data.map((d) => ({
            _id: d.denun_cod.toString(), // Mapeia denun_cod para _id (string)
            titulo: `Denúncia #${d.denun_cod} - ${d.denun_tipo_animal}`, // Cria um título
            descricao: d.denun_descricao,
            status: d.denun_status || 'Em Análise',
            dataCriacao: d.denun_data, // Passa a data bruta para o Card formatar
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
    <div className="minhas-denuncias-container">
      <h2>📋 Minhas Denúncias</h2>
      {denuncias.length === 0 ? (
        <div className="empty-state">
          <p>Você ainda não registrou nenhuma denúncia.</p>
          <p>Clique em "Nova Denúncia" para começar.</p>
        </div>
      ) : (
        <div className="denuncias-list">
          {denuncias.map((denuncia) => (
            <DenunciaCard key={denuncia._id} denuncia={denuncia} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MinhasDenuncias;
