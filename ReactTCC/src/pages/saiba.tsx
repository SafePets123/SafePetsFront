import React from "react";
import "../style.css";
import "../saibamais.css";
import logo from "/logo.png";

const SaibaMais: React.FC = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-icon" />
        </div>

        <div className="btn-header-top">
          <a href="/" className="btn-header">INÍCIO</a>
        </div>
      </header>

      <main className="info">
        <div className="text-info">
          <h2>Nossa Missão</h2>
          <p>
            A SafePets tem a missão de ajudar animais de estimação que sofrem
            maus-tratos, promovendo o bem-estar e a segurança de todos os pets.
          </p>
          <h3>Integrantes</h3>
          <ul>
            <li>Kewin</li>
            <li>Alexsander</li>
            <li>Gabriel</li>
            <li>Fernando</li>
            <li>Miguel</li>
          </ul>
        </div>
      </main>

      <div className="divisor-clean"></div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h4>SafePets</h4>
            <p className="footer-desc">Conectando animais a lares seguros.</p>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <p>Email: safepets@exemplo.com</p>
            <p>WhatsApp: (00) 91234-5678</p>
          </div>
          <div className="footer-col">
            <h4>Redes Sociais</h4>
            <p>Instagram: @safepets</p>
            <p>Facebook: /safepets</p>
          </div>
        </div>
        <div className="footer-line">
          <p>&copy; 2025 SafePets</p>
        </div>
      </footer>
    </div>
  );
};

export default SaibaMais;
