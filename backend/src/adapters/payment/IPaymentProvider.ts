export interface IPaymentProvider {
  charge(amount: number, userId: string): Promise<{
    success: boolean;
    transactionId?: string;
    error?: string;
  }>;
}