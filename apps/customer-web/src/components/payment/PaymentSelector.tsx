import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface PaymentSelectorProps {
  bookingId?: string;
  amount?: number;
}

export default function PaymentSelector({ bookingId, amount = 1000 }: PaymentSelectorProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'telebirr' | 'cbe' | 'chapa'>('telebirr');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: selectedMethod,
          amount,
          bookingId,
          userId: 'user_123', // In real app, get from auth context
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Payment failed');
      }

      const result = await res.json();
      if (result.success) {
        router.push(`/payment/success?transactionId=${result.transactionId}`);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{t('select_payment')}</h2>
      <p className="mb-4 text-lg">
        {t('total_price')}: {amount} {t('birr')}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-6">
        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="telebirr"
            checked={selectedMethod === 'telebirr'}
            onChange={() => setSelectedMethod('telebirr')}
            className="mr-3"
          />
          <span>{t('telebirr')}</span>
        </label>

        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="cbe"
            checked={selectedMethod === 'cbe'}
            onChange={() => setSelectedMethod('cbe')}
            className="mr-3"
          />
          <span>{t('cbe_birr')}</span>
        </label>

        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="chapa"
            checked={selectedMethod === 'chapa'}
            onChange={() => setSelectedMethod('chapa')}
            className="mr-3"
          />
          <span>{t('chapa')}</span>
        </label>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? t('loading') : t('confirm')}
      </button>
    </div>
  );
}