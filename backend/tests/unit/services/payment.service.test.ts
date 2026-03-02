import { PaymentService } from '../../../src/services/payment.service';
import { TelebirrAdapter } from '../../../src/adapters/payment/telebirr/TelebirrAdapter';
import { CbeBirrAdapter } from '../../../src/adapters/payment/cbe-birr/CbeBirrAdapter';
import { ChapaAdapter } from '../../../src/adapters/payment/chapa/ChapaAdapter';

jest.mock('../../../src/adapters/payment/telebirr/TelebirrAdapter');
jest.mock('../../../src/adapters/payment/cbe-birr/CbeBirrAdapter');
jest.mock('../../../src/adapters/payment/chapa/ChapaAdapter');

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let mockTelebirr: jest.Mocked<TelebirrAdapter>;
  let mockCbe: jest.Mocked<CbeBirrAdapter>;
  let mockChapa: jest.Mocked<ChapaAdapter>;

  beforeEach(() => {
    mockTelebirr = new TelebirrAdapter() as jest.Mocked<TelebirrAdapter>;
    mockCbe = new CbeBirrAdapter() as jest.Mocked<CbeBirrAdapter>;
    mockChapa = new ChapaAdapter() as jest.Mocked<ChapaAdapter>;

    paymentService = new PaymentService();
    (paymentService as any).adapters = {
      telebirr: mockTelebirr,
      cbe: mockCbe,
      chapa: mockChapa,
    };
  });

  it('should call Telebirr adapter for telebirr method', async () => {
    mockTelebirr.charge.mockResolvedValue({ success: true, transactionId: 'telebirr_123' });

    const result = await paymentService.process({
      method: 'telebirr',
      amount: 1000,
      userId: 'user123',
    });

    expect(mockTelebirr.charge).toHaveBeenCalledWith(1000, 'user123');
    expect(result).toEqual({ success: true, transactionId: 'telebirr_123' });
  });

  it('should throw for unsupported method', async () => {
    await expect(
      paymentService.process({ method: 'unknown' as any, amount: 100, userId: 'u1' })
    ).rejects.toThrow('Unsupported payment method');
  });
});