import { IPaymentProvider } from '../IPaymentProvider';

export class CbeBirrAdapter implements IPaymentProvider {
  async charge(amount: number, userId: string) {
    try {
      console.log(`[CBE Birr] Charging ${amount} ETB for user ${userId}`);
      return {
        success: true,
        transactionId: `cbe_${Date.now()}_${userId}`,
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}