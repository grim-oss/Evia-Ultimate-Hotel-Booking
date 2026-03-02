import { BookingService } from '../../../src/services/booking.service';
import { BookingRepository } from '../../../src/repositories/booking.repository';
import { ReservationHolder } from '../../../src/holding-system/reservation-holder';
import { PaymentService } from '../../../src/services/payment.service';
import { NotificationService } from '../../../src/services/notification.service';

// Mock dependencies
jest.mock('../../../src/repositories/booking.repository');
jest.mock('../../../src/holding-system/reservation-holder');
jest.mock('../../../src/services/payment.service');
jest.mock('../../../src/services/notification.service');

describe('BookingService', () => {
  let bookingService: BookingService;
  let mockBookingRepo: jest.Mocked<BookingRepository>;
  let mockReservationHolder: jest.Mocked<ReservationHolder>;
  let mockPaymentService: jest.Mocked<PaymentService>;
  let mockNotificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    mockBookingRepo = new BookingRepository() as jest.Mocked<BookingRepository>;
    mockReservationHolder = new ReservationHolder() as jest.Mocked<ReservationHolder>;
    mockPaymentService = new PaymentService() as jest.Mocked<PaymentService>;
    mockNotificationService = new NotificationService() as jest.Mocked<NotificationService>;

    bookingService = new BookingService();
    // Inject mocks (if your service allows dependency injection; otherwise use jest.spyOn)
    (bookingService as any).bookingRepo = mockBookingRepo;
    (bookingService as any).reservationHolder = mockReservationHolder;
    (bookingService as any).paymentService = mockPaymentService;
    (bookingService as any).notificationService = mockNotificationService;
  });

  it('should create a booking successfully', async () => {
    const bookingData = {
      roomId: 'room123',
      paymentMethod: 'telebirr',
      amount: 2500,
      userId: 'user123',
      phone: '+251911223344',
    };

    mockReservationHolder.hold.mockResolvedValue(true);
    mockPaymentService.process.mockResolvedValue({
      success: true,
      transactionId: 'txn_123',
    });
    mockBookingRepo.create.mockResolvedValue({
      id: 'book_123',
      ...bookingData,
      paymentId: 'txn_123',
    } as any);
    mockNotificationService.sendSMS.mockResolvedValue(true);

    const result = await bookingService.createBooking(bookingData);

    expect(mockReservationHolder.hold).toHaveBeenCalledWith('room123', 15);
    expect(mockPaymentService.process).toHaveBeenCalledWith({
      method: 'telebirr',
      amount: 2500,
      userId: 'user123',
      bookingId: undefined,
    });
    expect(mockBookingRepo.create).toHaveBeenCalled();
    expect(mockNotificationService.sendSMS).toHaveBeenCalledWith(
      '+251911223344',
      expect.stringContaining('book_123')
    );
    expect(result.id).toBe('book_123');
  });

  it('should throw if room hold fails', async () => {
    mockReservationHolder.hold.mockResolvedValue(false);

    await expect(bookingService.createBooking({ roomId: 'room123' } as any)).rejects.toThrow(
      'Room not available'
    );
  });

  it('should release hold if payment fails', async () => {
    mockReservationHolder.hold.mockResolvedValue(true);
    mockPaymentService.process.mockResolvedValue({ success: false, error: 'Payment failed' });

    await expect(
      bookingService.createBooking({ roomId: 'room123', paymentMethod: 'telebirr' } as any)
    ).rejects.toThrow('Payment failed');

    expect(mockReservationHolder.release).toHaveBeenCalledWith('room123');
  });
});