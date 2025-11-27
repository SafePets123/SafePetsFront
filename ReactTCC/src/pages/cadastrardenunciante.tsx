import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Cad.css";
import "../style.css";

const CadastrarDenunciante: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    den_nome: "",
    den_email: "",
    den_senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bodyData = {
      nome: formData.den_nome,
      email: formData.den_email,
      password: formData.den_senha,
    };

    try {
      const response = await fetch("https://safepetsback.onrender.com/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData ),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Cadastro realizado com sucesso! Redirecionando para o painel.");
        // Salva o token de autenticação
        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          console.error("Backend não retornou o token após o cadastro.");
        }
        // Salva o tipo de usuário
        localStorage.setItem("userType", "denunciante");

        // Salva o ID do usuário (essencial para funcionalidades)
        const userId = data.denunciante?.id; 
        if (userId) {
          localStorage.setItem("userId", userId.toString());
        } else{
          console.error("Backend não retornou o ID do usuário após o cadastro.");
        }
        // Salva o nome e o email para exibição
        localStorage.setItem("userName", bodyData.nome);
        localStorage.setItem("userEmail", bodyData.email);
        navigate("/dashboardDenunciante");
      } else{
        alert("❌ Erro ao cadastrar: " + (data.erro || "Erro desconhecido"));
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("❌ Falha ao conectar com o servidor.");
    }
  };

  return (
    <div className="entrar-page">
      <header>
        <Link to="/">
          <img src="logo.png" alt="Logo" className="logo-icon" />
        </Link>
      </header>

      <main>
        <div className="form-container">
          <h2>Cadastrar Denunciante</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="den_nome">Nome</label>
            <input
              type="text"
              id="den_nome"
              name="den_nome"
              placeholder="Seu nome completo"
              value={formData.den_nome}
              onChange={handleChange}
              required
            />

            <label htmlFor="den_email">Email</label>
            <input
              type="email"
              id="den_email"
              name="den_email"
              placeholder="Seu email"
              value={formData.den_email}
              onChange={handleChange}
              required
            />

            <label htmlFor="den_senha">Senha</label>
            <input
              type="password"
              id="den_senha"
              name="den_senha"
              placeholder="Crie uma senha"
              value={formData.den_senha}
              onChange={handleChange}
              required
            />

            <button type="submit">Cadastrar</button>

            <p>
              Já possui conta? <Link to="/entrar">Entrar</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastrarDenunciante;
