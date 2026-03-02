export class EthioTelecomSMSAdapter {
  async send(phone: string, message: string): Promise<boolean> {
    try {
      // In production, call Ethio Telecom SMS gateway here
      console.log(`[SMS] To: ${phone} – Message: ${message}`);
      return true;
    } catch (error) {
      console.error('SMS adapter error:', error);
      return false;
    }
  }
}