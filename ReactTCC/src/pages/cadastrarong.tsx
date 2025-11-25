import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../Cad.css";
import { Link } from 'react-router-dom';

const CadastrarOng: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    cnpj: "",
    local: "",
    cmrv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://safepetsback.onrender.com/ong/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cnpj: formData.cnpj.replace(/\D/g, "" ),
          cmrv: formData.cmrv.replace(/\D/g, ""),
        }),
      });

      if (response.ok) {
        alert("✅ ONG cadastrada com sucesso!");
        localStorage.setItem("userName", formData.nome);
        localStorage.setItem("userEmail", formData.email);
        navigate("/dashboardOng");
      } else {
                const errorData = await response.json();
        alert(`❌ Erro ao cadastrar ONG: ${errorData.erro || response.statusText}`);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("❌ Falha ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/cadastro">
          <img src="logo.png" alt="Logo" className="logo-icon" />
          </Link>
        </div>
      </header>

      <main className="form-container">
        <h2>Cadastro de ONG</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome da ONG:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

          <label>E-mail institucional:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Senha:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>CNPJ da ONG:</label>
          <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required />

          <label>Local (cidade/estado):</label>
          <input type="text" name="local" value={formData.local} onChange={handleChange} required />

          <label>CMRV:</label>
          <input type="text" name="cmrv" value={formData.cmrv} onChange={handleChange} />

          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </div>
  );
};

export default CadastrarOng;