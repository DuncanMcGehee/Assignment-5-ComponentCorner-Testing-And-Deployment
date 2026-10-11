import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({ id, name, price, image, description, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          className="product-card-image"
          src={image}
          alt={name}
        />

        <div className="product-card-content">
          <h2>{name}</h2>
          <p className="product-price">${price}</p>
          <p className="product-description">{description}</p>
        </div>
      </Link>

      <button className="product-button" onClick={onAddToCart}>
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;