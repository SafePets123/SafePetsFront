import React from "react";
import "../style.css";
import "../saibamais.css";
import logo from "/logo.png";
import { Link } from 'react-router-dom';

const SaibaMais: React.FC = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">
          <img src={logo} alt="Logo" className="logo-icon" />
          </Link>
        </div>
      </header>

      <main className="saiba">
        <div className="text-info2">
          <h2>Nossa Missão</h2>
          <p>
          A SafePets existe para combater maus-tratos e garantir proteção, 
          acolhimento e bem-estar para animais em situação de risco. Nosso compromisso é 
          atuar de forma eficiente para que cada pet tenha a segurança e o respeito que merece.
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
            <p>Email: safepet38s@gmail.com</p>
            <p>WhatsApp: (24) 99981-0631</p>
          </div>
          <div className="footer-col">
            <h4>Redes Sociais</h4>
            <p>Instagram: @safe_pets2025</p>
            <p>Facebook: facebook.com/share/1Bb2CDEftV/</p>
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
