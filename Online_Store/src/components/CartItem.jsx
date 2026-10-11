import './CartItem.css';

function CartItem({ name, price, onRemove }) {
  return (
    <div className="cart-item">
      <span className="cart-item-name">{name}</span>
      <span className="cart-item-price">${price}</span>
      <button className="cart-item-remove" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;