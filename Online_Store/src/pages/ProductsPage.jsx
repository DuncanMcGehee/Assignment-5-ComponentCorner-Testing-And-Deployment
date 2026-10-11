import ProductCard from '../components/ProductCard';

function ProductsPage({ products, addToCart }) {
  return (
    <main>
      <section className="products-section" id="products">
        <h2>Featured Products</h2>

        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;