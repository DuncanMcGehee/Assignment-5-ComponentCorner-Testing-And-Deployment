import './Header.css';
import { Link } from 'react-router-dom';

function Header({ storeName, cartCount }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <h1 className="store-name">{storeName}</h1>

        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Link to="/cart" className="cart-container">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;