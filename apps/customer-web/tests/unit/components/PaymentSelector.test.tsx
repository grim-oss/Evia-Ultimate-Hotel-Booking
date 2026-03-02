import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentSelector from '../../../src/components/payment/PaymentSelector';

describe('PaymentSelector', () => {
  it('renders payment options', () => {
    render(<PaymentSelector amount={2000} />);
    expect(screen.getByText(/telebirr/i)).toBeInTheDocument();
    expect(screen.getByText(/cbe_birr/i)).toBeInTheDocument();
    expect(screen.getByText(/chapa/i)).toBeInTheDocument();
    expect(screen.getByText(/total_price/i)).toHaveTextContent('2000');
  });

  it('calls API and redirects on successful payment', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, transactionId: 'txn_123' }),
    });
    global.fetch = mockFetch;

    const mockPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
      query: { bookingId: 'booking123' },
    }));

    render(<PaymentSelector amount={2000} />);

    fireEvent.click(screen.getByText(/telebirr/i));
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/payments/initiate'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('telebirr'),
        })
      );
      expect(mockPush).toHaveBeenCalledWith('/payment/success?transactionId=txn_123');
    });
  });
});