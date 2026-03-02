// Specific Telebirr payment form (if extra fields needed)
import { useTranslation } from 'next-i18next';

interface TelebirrPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export default function TelebirrPayment({ amount, onSuccess, onError }: TelebirrPaymentProps) {
  const { t } = useTranslation('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd collect phone number, maybe PIN
    // For now, simulate success
    setTimeout(() => onSuccess('telebirr_' + Date.now()), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">{t('phone_number')}</label>
        <input
          type="tel"
          placeholder="+251..."
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Pay {amount} {t('birr')} via Telebirr
      </button>
    </form>
  );
}