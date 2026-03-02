import { BookingRepository } from '../repositories/booking.repository';
import { ReservationHolder } from '../holding-system/reservation-holder';
import { PaymentService } from './payment.service';
import { NotificationService } from './notification.service';
import { HotelRepository } from '../repositories/hotel.repository';

export class BookingService {
  private bookingRepo = new BookingRepository();
  private hotelRepo = new HotelRepository();
  private reservationHolder = new ReservationHolder();
  private paymentService = new PaymentService();
  private notificationService = new NotificationService();

  async createBooking(data: any) {
    // 1. Validate hotel and room availability
    const room = await this.hotelRepo.findRoomById(data.roomId);
    if (!room) throw new Error('Room not found');

    // 2. Hold the room for 15 minutes
    const holdAcquired = await this.reservationHolder.hold(data.roomId, 15);
    if (!holdAcquired) throw new Error('Room is not available for the selected dates');

    try {
      // 3. Initiate payment
      const paymentResult = await this.paymentService.process({
        method: data.paymentMethod,
        amount: room.pricePerNight,
        userId: data.userId,
        bookingId: undefined,
      });

      if (!paymentResult.success) {
        throw new Error('Payment failed: ' + (paymentResult.error || 'Unknown error'));
      }

      // At this point, paymentResult is guaranteed to be success: true with transactionId
      const { transactionId } = paymentResult as { success: true; transactionId: string };

      // 4. Create booking record
      const booking = await this.bookingRepo.create({
        ...data,
        paymentId: transactionId,
        status: 'confirmed',
        totalPrice: room.pricePerNight,
      });

      // 5. Release hold (now it's a confirmed booking)
      await this.reservationHolder.release(data.roomId);

      // 6. Send confirmation SMS
      await this.notificationService.sendSMS(
        data.phone,
        `Booking confirmed! ID: ${booking.id}`
      );

      return booking;
    } catch (error) {
      // Release hold on any failure
      await this.reservationHolder.release(data.roomId);
      throw error;
    }
  }
}