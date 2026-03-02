import { TelebirrAdapter } from '../adapters/payment/telebirr/TelebirrAdapter';
import { CbeBirrAdapter } from '../adapters/payment/cbe-birr/CbeBirrAdapter';
import { ChapaAdapter } from '../adapters/payment/chapa/ChapaAdapter';
import { IPaymentProvider } from '../adapters/payment/IPaymentProvider';

type PaymentMethod = 'telebirr' | 'cbe' | 'chapa';

export class PaymentService {
  private adapters: Record<PaymentMethod, IPaymentProvider> = {
    telebirr: new TelebirrAdapter(),
    cbe: new CbeBirrAdapter(),
    chapa: new ChapaAdapter(),
  };

  async process(data: { method: PaymentMethod; amount: number; userId: string; bookingId?: string }) {
    const adapter = this.adapters[data.method];
    if (!adapter) throw new Error(`Unsupported payment method: ${data.method}`);

    try {
      const result = await adapter.charge(data.amount, data.userId);
      if (result.success) {
        // Optionally log transaction in database
        console.log(`Payment successful: ${result.transactionId}`);
      }
      return result;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}