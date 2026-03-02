import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/layout/Header';

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/booking/i)).toBeInTheDocument();
    expect(screen.getByText(/payment/i)).toBeInTheDocument();
  });

  it('shows language switcher', () => {
    render(<Header />);
    expect(screen.getByText(/አማርኛ|English/)).toBeInTheDocument();
  });
});