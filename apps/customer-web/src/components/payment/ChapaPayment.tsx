// Specific Chapa payment form
import { useTranslation } from 'next-i18next';

interface ChapaPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export default function ChapaPayment({ amount, onSuccess, onError }: ChapaPaymentProps) {
  const { t } = useTranslation('common');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment
    setTimeout(() => onSuccess('chapa_' + Date.now()), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">{t('email')}</label>
        <input type="email" placeholder="email@example.com" required className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
        Pay {amount} {t('birr')} via Chapa
      </button>
    </form>
  );
}