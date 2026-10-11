import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function ProductDetailsPage({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <main>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <ProductCard
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
        description={product.description}
        onAddToCart={() => addToCart(product)}
      />
    </main>
  );
}

export default ProductDetailsPage;