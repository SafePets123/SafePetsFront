import './style.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';


function App() {
  const [activeSlide, setActiveSlide] = useState(0);

 const slides = [
    {
      image: '/denunciae.jpg',
      text: 'Denuncie. Salve uma vida.',
      link: '/cadastro',
      label: 'DENUNCIE',
    },
    {
      image: '/adoção.jpg',
      text: 'Adote. Mude uma vida.',
      link: '/cadastro',
      label: 'ADOTAR',
    },
    {
      image: '/doação.jpg',
      text: 'Doe e ajude causas importantes. Sua ajuda faz diferença.',
      link: '/cadastro',
      label: 'DOAR',
    },
  ];

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img src="/logo.png" alt="Logo" className="logo-icon" />
          </div>
          <nav className="nav-buttons">
            <Link to="/cadastro" className="btn-header">CADASTRAR</Link>
            <Link to="/entrar" className="btn-header">ENTRAR</Link>
          </nav>
        </div>
      </header>

      <div className="menu">
        <div className="container menu-container">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className="menu-btn"
            >
              {slide.label}
            </button>
          ))}
        </div>
      </div>

      <main className="slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            style={{ display: index === activeSlide ? 'flex' : 'none' }}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="overlay">
              <p>{slide.text}</p>
              <Link to={slide.link} className="slide-btn">{slide.label}</Link>
            </div>
          </div>
        ))}
      </main>

      <section className="info">
        <div className="container info-inner">
          <div className="text-info">
            <p>
              Venha conhecer nós da SafePets, uma empresa de denúncia e resgate de animais maltratados.<br />
              Nós viemos de Volta Redonda com uma ideia de facilitar os meios de denúncia sobre maus-tratos no Brasil.
            </p>
            <Link to="/saibamais" className="saiba-btn">SAIBA MAIS!</Link>
          </div>
          <div className="image-box">
            <img src="/gatooo.jpg" alt="Gato" className="gato-img" />
          </div>
        </div>
      </section>

      <div className="divisor-clean"></div>

      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-col">
            <h4>SafePets</h4>
            <p className="footer-desc">Conectando animais a lares seguros.</p>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <p>Email: safepets@exemplo.com</p>
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
    </>
  );
}

export default App;