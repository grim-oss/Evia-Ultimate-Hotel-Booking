import { IPaymentProvider } from '../IPaymentProvider';

export class TelebirrAdapter implements IPaymentProvider {
  async charge(amount: number, userId: string) {
    try {
      // In production, call Telebirr API here
      console.log(`[Telebirr] Charging ${amount} ETB for user ${userId}`);
      // Simulate success
      return {
        success: true,
        transactionId: `telebirr_${Date.now()}_${userId}`,
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}