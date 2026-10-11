import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductCard', () => {
  const defaultProps = {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://placehold.co/600x400',
    description: 'Premium noise-cancelling headphones',
    onAddToCart: vi.fn()
  };

  test('renders without crashing', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);
  });

  test('displays product information from props', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Premium noise-cancelling headphones')).toBeInTheDocument();
  });

  test('displays the product image', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);
    const image = screen.getByRole('img', { name: 'Wireless Headphones' });
    expect(image).toHaveAttribute('src', 'https://placehold.co/600x400');
  });

  test('contains an Add to Cart button', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  test('links to the product details page', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/1');
  });

  test('calls onAddToCart when Add to Cart is clicked', () => {
    const mockAdd = vi.fn();
    renderWithRouter(<ProductCard {...defaultProps} onAddToCart={mockAdd} />);

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(mockAdd).toHaveBeenCalledTimes(1);
  });
});