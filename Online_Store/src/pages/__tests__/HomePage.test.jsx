import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Mock Hero - replace with a simple test component
vi.mock('../../components/Hero', () => {
  return {
    default: ({ title }) => <div data-testid="hero">{title}</div>
  };
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
  test('renders without crashing', () => {
    renderWithRouter(<HomePage />);
  });

  test('renders the Hero with its title', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByText('Level Up Your Gaming')).toBeInTheDocument();
  });

  test('displays the Why Shop with Us section', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Why Shop with Us?')).toBeInTheDocument();
  });
});