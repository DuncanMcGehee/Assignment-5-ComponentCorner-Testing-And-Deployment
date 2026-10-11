import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

const CART_KEY = 'componentcorner-cart';
const headphones = { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'x.jpg', description: 'test' };

// The cart badge only exists when the cart has items
const getBadge = () => document.querySelector('.cart-badge');

describe('App', () => {
  beforeEach(() => {
    // mockReset clears calls AND return values so tests don't leak into each other
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    localStorageMock.getItem.mockReturnValue(null);
    // App has its own BrowserRouter, so reset the URL to the home page
    window.history.pushState({}, '', '/');
  });

  test('renders the home page', () => {
    render(<App />);
    expect(screen.getByText('Why Shop with Us?')).toBeInTheDocument();
  });

  test('loads cart data from localStorage on startup', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([headphones, headphones]));

    render(<App />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(CART_KEY);
    expect(getBadge()).toHaveTextContent('2');
  });

  test('saves the cart to localStorage', async () => {
    render(<App />);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(CART_KEY, '[]');
    });
  });

  test('handles malformed JSON in localStorage', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    localStorageMock.getItem.mockReturnValue('not valid json');

    render(<App />);

    expect(screen.getByText('Why Shop with Us?')).toBeInTheDocument();
    expect(getBadge()).toBeNull();
    warnSpy.mockRestore();
  });

  test('ignores stored data that is not an array', () => {
    localStorageMock.getItem.mockReturnValue('{"a":1}');

    render(<App />);

    expect(screen.getByText('Why Shop with Us?')).toBeInTheDocument();
    expect(getBadge()).toBeNull();
  });

  test('adding a product updates the badge and saves to localStorage', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Products' }));
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(getBadge()).toHaveTextContent('1');
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
        CART_KEY,
        expect.stringContaining('Wireless Headphones')
      );
    });
  });

  test('cart persists across remounts', async () => {
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Products' }));
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
        CART_KEY,
        expect.stringContaining('Wireless Headphones')
      );
    });

    // Simulate closing and reopening the tab
    const savedValue = localStorageMock.setItem.mock.calls.at(-1)[1];
    unmount();
    localStorageMock.getItem.mockReturnValue(savedValue);
    render(<App />);

    expect(getBadge()).toHaveTextContent('1');
  });

  test('removing one duplicate item removes only that entry', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([headphones, headphones]));
    window.history.pushState({}, '', '/cart');

    render(<App />);
    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(2);

    fireEvent.click(screen.getAllByRole('button', { name: /remove/i })[0]);

    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(1);
  });

    test('About and Contact routes render', () => {
        window.history.pushState({}, '', '/about');
        const { unmount } = render(<App />);
        expect(screen.getByRole('heading', { level: 2, name: 'About GameVault' })).toBeInTheDocument();
        unmount();

        window.history.pushState({}, '', '/contact');
        render(<App />);
        expect(screen.getByRole('heading', { level: 2, name: 'Contact Us' })).toBeInTheDocument();
  });
});
