import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

describe('CartItem', () => {
  const defaultProps = {
    name: 'Smart Watch',
    price: 249.99,
    onRemove: vi.fn()
  };

  test('renders without crashing', () => {
    render(<CartItem {...defaultProps} />);
  });

  test('displays item name and price', () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.getByText('Smart Watch')).toBeInTheDocument();
    expect(screen.getByText('$249.99')).toBeInTheDocument();
  });

  test('calls onRemove when Remove is clicked', () => {
    const mockRemove = vi.fn();
    render(<CartItem {...defaultProps} onRemove={mockRemove} />);

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    expect(mockRemove).toHaveBeenCalledTimes(1);
  });
});