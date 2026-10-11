import CartItem from '../components/CartItem';

function CartPage({ cart, removeFromCart }) {
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <main>
      <section className="cart-section" id="cart">
        <h2>Your Cart</h2>

        {cart.length > 0 ? (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  onRemove={() => removeFromCart(index)}
                />
              ))}
            </div>
            <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
          </>
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty. Go add something!</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default CartPage;