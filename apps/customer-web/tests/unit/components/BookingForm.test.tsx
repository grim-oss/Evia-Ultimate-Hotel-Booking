import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../../../src/components/booking/BookingForm';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('BookingForm', () => {
  it('renders all fields', () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/check-in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/check-out/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm_booking/i })).toBeInTheDocument();
  });

  it('submits the form and redirects on success', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'booking123' }),
    });
    global.fetch = mockFetch;

    const mockPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));

    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '2025-01-01' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '2025-01-03' } });
    fireEvent.change(screen.getByLabelText(/guests/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+251911223344' } });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookings'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('+251911223344'),
        })
      );
      expect(mockPush).toHaveBeenCalledWith('/payment?bookingId=booking123');
    });
  });
});