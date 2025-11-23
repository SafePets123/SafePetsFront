import { Link } from 'react-router-dom';
import '../Cad.css';

export default function CadastroTipo() {
  return (
    <div className="entrar-page">
      <header>
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo SafePets" className="logo-icon" />
          </Link>
        </div>
      </header>

      <div className="cadastro-centralizado">
        <h1>Escolha o tipo de cadastro</h1>

        <div className="card-container">
          <Link to="/cadastrarorgao" className="card">Órgão</Link>
          <Link to="/cadastrarong" className="card">ONG</Link>
          <Link to="/cadastrodenunciante" className="card">Denunciante</Link>
        </div>
      </div>
    </div>
  );
}
