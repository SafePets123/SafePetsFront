// Arquivo: PerfilUsuario.tsx (Localizado em src/components/ ou src/pages/ dependendo da sua estrutura)

import React, { useState, useEffect } from 'react';
import '../PerfilUsuario.css'; // Importa o CSS

interface Usuario {
    nome: string;
    email: string;
    telefone?: string; // Adicione outros campos que você queira exibir/editar
}

const PerfilUsuario: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario>({ nome: '', email: '' });
    const [formData, setFormData] = useState({ nome: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const API_BASE_URL = "https://safepetsback.onrender.com"; // URL do seu backend

    // 1. Função para buscar os dados do usuário
    const fetchUsuario = async ( ) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail"); 

            if (!token || !userEmail) {
                setMessage({ type: 'error', text: 'Usuário não autenticado. Faça login novamente.' });
                setLoading(false);
                return;
            }

            // GET: Busca os dados do usuário pelo email (rota existente)
            const response = await fetch(`${API_BASE_URL}/userauth/${userEmail}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao carregar dados do perfil.');
            }

            const data = await response.json();
            
            // Mapeia os dados do backend para o estado do componente
            const fetchedUser: Usuario = {
                nome: data.den_nome,
                email: data.den_email,
                // Mapeie outros campos aqui se existirem (ex: telefone: data.den_telefone)
            };

            setUsuario(fetchedUser);
            setFormData({ nome: fetchedUser.nome, email: fetchedUser.email, password: '' });

        } catch (error: any) {
            console.error("Erro ao buscar perfil:", error);
            setMessage({ type: 'error', text: error.message || 'Erro ao carregar perfil.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuario();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Função para atualizar o perfil (PUT)
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem("token");
            
            const updatePayload: any = {};
            if (formData.nome !== usuario.nome) updatePayload.nome = formData.nome;
            if (formData.email !== usuario.email) updatePayload.email = formData.email;
            if (formData.password) updatePayload.password = formData.password;

            if (Object.keys(updatePayload).length === 0) {
                setMessage({ type: 'error', text: 'Nenhuma alteração detectada.' });
                setLoading(false);
                return;
            }

            // PUT: Atualiza o perfil
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Falha ao atualizar o perfil.');
            }

            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
            // Se o email foi alterado, o token e o localStorage podem precisar ser atualizados
            fetchUsuario(); // Recarrega os dados
            setFormData({ ...formData, password: '' }); // Limpa o campo de senha

        } catch (error: any) {
            console.error("Erro ao atualizar:", error);
            setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil.' });
        } finally {
            setLoading(false);
        }
    };

    // 3. Função para deletar a conta (DELETE)
    const handleDelete = async () => {
        if (!window.confirm("ATENÇÃO: Tem certeza que deseja deletar sua conta? Esta ação é irreversível.")) {
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem("token");

            // DELETE: Deleta a conta
            const response = await fetch(`${API_BASE_URL}/user/delete`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Falha ao deletar a conta.');
            }

            // Limpa o localStorage e redireciona para o login
            localStorage.clear();
            window.location.href = "/entrar"; 

        } catch (error: any) {
            console.error("Erro ao deletar:", error);
            setMessage({ type: 'error', text: error.message || 'Erro ao deletar a conta.' });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !message) {
        return <p className="loading-message">Carregando perfil...</p>;
    }

    return (
        <div className="perfil-usuario-container">
            <h2>👤 Meu Perfil</h2>
            
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleUpdate} className="perfil-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Nova Senha (opcional):</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Deixe em branco para não alterar"
                        disabled={loading}
                    />
                </div>

                <button type="submit" className="update-btn" disabled={loading}>
                    {loading ? 'Salvando...' : 'Atualizar Perfil'}
                </button>
            </form>

            <div className="delete-section">
                <h3>Excluir Conta</h3>
                <p>Esta ação é permanente e não pode ser desfeita.</p>
                <button onClick={handleDelete} className="delete-btn" disabled={loading}>
                    Deletar Minha Conta
                </button>
            </div>
        </div>
    );
};

export default PerfilUsuario;
