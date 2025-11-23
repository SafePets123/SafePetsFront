import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style.css";
import "../Ent.css";

const Ent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "denunciante",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let endpoint = "";
    let redirectPath = "";

    switch (formData.userType) {
      case "denunciante":
        endpoint = "http://localhost:3344/userauth";
        redirectPath = "/DashboardDenunciante";
        break;
      case "ong":
        endpoint = "http://localhost:3344/ong/login";
        redirectPath = "/DashboardOng";
        break;
      case "orgao":
        endpoint = "http://localhost:3344/orgao/login";
        redirectPath = "/DashboardAutoridade";
        break;
      default:
        alert("Tipo de usuário inválido.");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login realizado com sucesso!");

        // ----------------------------------------------------------------
        // CORREÇÃO 1: Salvar o ID do usuário (den_cod) no LocalStorage
        // O backend retorna o ID em data.denunciante.id
        // ----------------------------------------------------------------
        const user = data.denunciante || data.ong || data.orgao;
        
        if (data.token) localStorage.setItem("token", data.token);
        localStorage.setItem("userType", formData.userType);

        if (user) {
          // Salvar o ID do usuário (den_cod)
          if (user.id) localStorage.setItem("userId", user.id.toString()); 
          
          localStorage.setItem("userName", user.nome || "Usuário");
          localStorage.setItem("userEmail", user.email || formData.email);
        } else {
          localStorage.setItem("userName", formData.email.split("@")[0] || "Usuário");
          localStorage.setItem("userEmail", formData.email);
        }
        // ----------------------------------------------------------------

        navigate(redirectPath);
      } else {
        alert("❌ Erro no login: " + (data.mensagem || "Falha desconhecida"));
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("❌ Falha ao conectar com o servidor.");
    }
  };

  return (
    <div className="entrar-page">
      <header>
        <div className="logo">
          <Link to="/">
            <img src="logo.png" alt="Logo" className="logo-icon" />
          </Link>
        </div>
      </header>

      <main className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userType">Eu sou:</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="denunciante">Denunciante</option>
            <option value="ong">ONG</option>
            <option value="orgao">Autoridade</option>
          </select>

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        <p>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default Ent;