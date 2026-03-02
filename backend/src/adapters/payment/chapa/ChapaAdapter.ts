import { IPaymentProvider } from '../IPaymentProvider';

export class ChapaAdapter implements IPaymentProvider {
  async charge(amount: number, userId: string) {
    try {
      console.log(`[Chapa] Charging ${amount} ETB for user ${userId}`);
      return {
        success: true,
        transactionId: `chapa_${Date.now()}_${userId}`,
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}