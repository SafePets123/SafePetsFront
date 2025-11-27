import React, { useState, useEffect } from "react";
import axios from "axios";
import "../denuncie.css";
import "../style.css";

interface DenuncieProps {
  embed?: boolean;
}

const Denuncie: React.FC<DenuncieProps> = ({ embed = false }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [animal, setAnimal] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [midia, setMidia] = useState<FileList | null>(null);
  const [mensagem, setMensagem] = useState<{ text: string; type: "ok" | "err" | "" }>({ text: "", type: "" });

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setNome(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const formatarTelefone = (valor: string): string => {
    let apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length > 11) apenasNumeros = apenasNumeros.slice(0, 11);
    if (apenasNumeros.length > 6) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
    } else if (apenasNumeros.length > 2) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    } else if (apenasNumeros.length > 0) {
      return `(${apenasNumeros}`;
    }
    return "";
  };

  const handleNomeChange = (e:
    React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value);
  const handleEmailChange = (e:
    React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleTelefoneChange = (e:
    React.ChangeEvent<HTMLInputElement>) => setTelefone(formatarTelefone(e.target.value));
  const handleEnderecoChange = (e:
    React.ChangeEvent<HTMLInputElement>) => setEndereco(e.target.value);
  const handleAnimalChange = (e:
    React.ChangeEvent<HTMLSelectElement>) => setAnimal(e.target.value);
  const handleDescricaoChange = (e:
    React.ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value);
  const handleFileChange = (e:
    React.ChangeEvent<HTMLInputElement>) => setMidia(e.target.files);

  const resetForm = () => {
    // Não reseta nome e email se estiverem preenchidos automaticamente
    if (!localStorage.getItem("userName")) setNome(""); 
    if (!localStorage.getItem("userEmail")) setEmail("");
    setTelefone(""); setEndereco(""); setAnimal(""); setDescricao(""); setMidia(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome || !email || !endereco || !animal || !descricao) {
      setMensagem({ text: "Preencha todos os campos obrigatórios.", type: "err" });
      return;
    }

    const token = localStorage.getItem("token");
    // const userId = localStorage.getItem("userId"); // Não é mais necessário, o backend pega do token

    if (!token) {
      setMensagem({ text: "Você precisa estar logado para fazer uma denúncia.", type: "err" });
      return;
    }
    const midiaUrl = midia && midia.length > 0 ? midia[0].name : null; 
    const payload = {
        denun_local: endereco, // Mapeando 'endereco' para 'denun_local' (ajuste se necessário)
        denun_hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        denun_data: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        dep_cod: 1, // Valor fixo para teste (assumindo que 1 é um departamento válido)
        denun_telefone: telefone.replace(/\D/g, ""), // Remove a formatação
        denun_endereco: endereco, // Mapeando 'endereco' para 'denun_endereco' (ajuste se necessário)
        denun_tipo_animal: animal, // Mapeando 'animal' para 'denun_tipo_animal'
        denun_descricao: descricao,
        denun_midia_url: midiaUrl,
        // idUser, nome, email não são mais enviados no body, pois o backend pega do token
    };
    // ----------------------------------------------------------------

    try {
      const response = await axios.post("https://safepetsback.onrender.com/denuncias", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMensagem({ text: response.data.message || "Denúncia registrada com sucesso!", type: "ok" });
      resetForm();
    } catch (error: any) {
      console.error("Erro ao enviar denúncia:", error);
      setMensagem({ text: error.response?.data?.error || "Erro ao registrar denúncia.", type: "err" });
    }
  };

  return (
    <div className={`page-root ${embed ? "embed" : ""}`}>
     

      <main id='bagre'>
        <section className="form-section">
          <div className="form-container">
            <h2>Formulário de Denúncia</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
              <label htmlFor="nome">Nome:</label>
              <input id="nome" name="nome" type="text" value=
              {nome} onChange={handleNomeChange} placeholder="Seu nome completo" required />

              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" value=
              {email} onChange={handleEmailChange} placeholder="seu@email.com" required />

              <label htmlFor="telefone">Telefone:</label>
              <input id="telefone" name="telefone" type="tel" value=
              {telefone} onChange={handleTelefoneChange} placeholder="(00) 00000-0000" />

              <label htmlFor="endereco">Endereço:</label>
              <input id="endereco" name="endereco" type="text" value=
              {endereco} onChange={handleEnderecoChange} placeholder="Rua, número, bairro, cidade" required />

              <label htmlFor="animal">Tipo de Animal:</label>
              <select id="animal" name="animal" value={animal} onChange={handleAnimalChange} required>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
              </select>

              <label htmlFor="descricao">Descrição:</label>
              <textarea
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={handleDescricaoChange}
                placeholder="Descreva o que está acontecendo (local, horários, sinais de maus-tratos etc.)"
                required
                rows={5}
              />

              <label htmlFor="midia">Anexar mídia (fotos/vídeos):</label>
              <input id="midia" name="midia" type="file" multiple onChange={handleFileChange} />

              {midia && midia.length > 0 && (
                <div className="file-preview">
                  <strong>{midia.length}</strong> arquivo(s) selecionado(s):
                  <ul>{Array.from(midia).map((f, i) => <li key={i}>{f.name}</li>)}</ul>
                </div>
              )}

              <button type="submit" className="btn-primary">Enviar Denúncia</button>

              {mensagem.text && (
                <p className={`form-message ${mensagem.type === "ok" ? "ok" : "err"}`}>{mensagem.text}</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Denuncie;