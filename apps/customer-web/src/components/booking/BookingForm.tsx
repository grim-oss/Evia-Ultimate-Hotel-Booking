import { useState, FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface BookingFormData {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  phone: string;
  paymentMethod: 'telebirr' | 'cbe' | 'chapa';
}

export default function BookingForm() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<BookingFormData>({
    hotelId: 'hotel_123', // Mock – replace with actual selection
    roomId: 'room_456',
    checkIn: '',
    checkOut: '',
    guests: 1,
    phone: '',
    paymentMethod: 'telebirr',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Booking failed');
      }

      const booking = await res.json();
      // Redirect to payment page with booking ID
      router.push(`/payment?bookingId=${booking.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{t('book_hotel')}</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">{t('check_in')}</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">{t('check_out')}</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">{t('guests')}</label>
        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">{t('phone_number')}</label>
        <input
          type="tel"
          name="phone"
          placeholder="+251911223344"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">{t('select_payment')}</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="telebirr">{t('telebirr')}</option>
          <option value="cbe">{t('cbe_birr')}</option>
          <option value="chapa">{t('chapa')}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? t('loading') : t('confirm_booking')}
      </button>
    </form>
  );
}