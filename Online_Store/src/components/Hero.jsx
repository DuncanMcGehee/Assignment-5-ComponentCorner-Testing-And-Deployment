import './Hero.css';

function Hero({ title, subtitle, callToAction }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <button className="hero-button">{callToAction}</button>
      </div>
    </section>
  );
}

export default Hero;