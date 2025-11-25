import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style.css"; 
import "../Cad.css"; 

const CadastrarOrgao: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    telefone: "", 
    tipo_orgao: "", 
    outro_tipo_orgao: "", 
    num_identificacao_funcional: "", 
    cidade_atuacao: "", 
    estado: "", 
  });

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)/, "($1");
    }
    return value;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      setFormData({ ...formData, [name]: formatPhoneNumber(value) });
    } else if (name === "tipo_orgao" && value !== "Outro") {
      setFormData({ ...formData, [name]: value, outro_tipo_orgao: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // VERIFIQUE A PORTA CORRETA DO SEU BACKEND (EX: 3333 OU 3000)
      const response = await fetch("https://safepetsback.onrender.com/orgao/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          password: formData.password,
          telefone: formData.telefone.replace(/\D/g, '' ), 
          tipo_orgao: formData.tipo_orgao === "Outro" ? formData.outro_tipo_orgao : formData.tipo_orgao,
          // CORREÇÃO: Limpeza do campo antes de enviar
          num_identificacao_funcional: formData.num_identificacao_funcional.replace(/\D/g, ''),
          cidade_atuacao: formData.cidade_atuacao,
          estado: formData.estado,
        }),
      });

      if (response.ok) {
        alert("✅ Órgão cadastrado com sucesso!");
        localStorage.setItem("userName", formData.nome);
        localStorage.setItem("userEmail", formData.email);
        navigate("/dashboardAutoridade"); 
      } else {
        const errorData = await response.json();
        alert(`❌ Erro ao cadastrar Órgão: ${errorData.erro || response.statusText}`);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("❌ Falha ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-page">
      <header>
        <div className="logo">
          <Link to="/">
            <img src="logo.png" alt="Logo" className="logo-icon" />
          </Link>
        </div>
      </header>

      <main className="form-container">
        <h2>Cadastro de Órgão</h2> 
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail Institucional:</label>
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

          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          <label htmlFor="tipo_orgao">Tipo de Órgão:</label>
          <select
            id="tipo_orgao"
            name="tipo_orgao"
            value={formData.tipo_orgao}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Tipo de Órgão</option>
            <option value="Policial">Policial</option>
            <option value="Bombeiro">Bombeiro</option>
            <option value="Guarda Municipal">Guarda Municipal</option>
            <option value="Fiscalização Ambiental">Fiscalização Ambiental</option>
            <option value="Outro">Outro</option>
          </select>

          {formData.tipo_orgao === "Outro" && (
            <>
              <label htmlFor="outro_tipo_orgao">Especificar Outro Tipo de Órgão:</label>
              <input
                type="text"
                id="outro_tipo_orgao"
                name="outro_tipo_orgao"
                value={formData.outro_tipo_orgao}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label htmlFor="num_identificacao_funcional">Número de Identificação Funcional:</label>
          <input
            type="text"
            id="num_identificacao_funcional"
            name="num_identificacao_funcional"
            value={formData.num_identificacao_funcional}
            onChange={handleChange}
            required
          />

          <label htmlFor="cidade_atuacao">Cidade de Atuação:</label>
          <input
            type="text"
            id="cidade_atuacao"
            name="cidade_atuacao"
            value={formData.cidade_atuacao}
            onChange={handleChange}
            required
          />

          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        <p>
          Já tem uma conta? <Link to="/entrar">Entrar</Link>
        </p>
      </main>
    </div>
  );
};

export default CadastrarOrgao;
