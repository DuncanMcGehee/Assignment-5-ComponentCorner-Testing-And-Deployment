import './Hero.css';
import { Link } from 'react-router-dom';

function Hero({ title, subtitle, callToAction }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <Link to="/products" className="hero-button">{callToAction}</Link>
      </div>
    </section>
  );
}

export default Hero;