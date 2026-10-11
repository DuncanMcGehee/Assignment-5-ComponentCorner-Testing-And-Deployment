import Hero from '../components/Hero';

function HomePage() {
  return (
    <main>
      <Hero
        title="Level Up Your Gaming"
        subtitle="Discover premium gaming gear designed for players who demand the best."
        callToAction="Shop Now"
      />

      <section className="why-shop-section">
        <h2>Why Shop with Us?</h2>
        <p>
          GameVault offers premium gaming gear at honest prices, with fast
          shipping and a hassle-free return policy. Every product is tested
          by real gamers before it hits our shelves.
        </p>
      </section>
    </main>
  );
}

export default HomePage;