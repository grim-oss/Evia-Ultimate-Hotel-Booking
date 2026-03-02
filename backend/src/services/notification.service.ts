import { EthioTelecomSMSAdapter } from '../adapters/messaging/EthioTelecomSMSAdapter';

export class NotificationService {
  private smsAdapter = new EthioTelecomSMSAdapter();

  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      return await this.smsAdapter.send(phone, message);
    } catch (error) {
      console.error('SMS sending failed:', error);
      return false; // Don't throw – non‑critical
    }
  }
}