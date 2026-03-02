// Specific CBE Birr payment form
import { useTranslation } from 'next-i18next';

interface CBEBirrPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export default function CBEBirrPayment({ amount, onSuccess, onError }: CBEBirrPaymentProps) {
  const { t } = useTranslation('common');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment
    setTimeout(() => onSuccess('cbe_' + Date.now()), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">{t('phone_number')}</label>
        <input type="tel" placeholder="+251..." required className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Pay {amount} {t('birr')} via CBE Birr
      </button>
    </form>
  );
}