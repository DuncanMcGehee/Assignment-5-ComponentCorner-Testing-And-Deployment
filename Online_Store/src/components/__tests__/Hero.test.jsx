import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../Hero';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Hero', () => {
  test('displays title and subtitle', () => {
    renderWithRouter(<Hero title="Level Up" subtitle="Great gear" callToAction="Shop Now" />);
    expect(screen.getByText('Level Up')).toBeInTheDocument();
    expect(screen.getByText('Great gear')).toBeInTheDocument();
  });

  test('Shop Now links to the products page', () => {
    renderWithRouter(<Hero title="Level Up" subtitle="Great gear" callToAction="Shop Now" />);
    expect(screen.getByRole('link', { name: 'Shop Now' })).toHaveAttribute('href', '/products');
  });
});