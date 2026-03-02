import { Router, Request, Response } from 'express';
import { BookingService } from '../services/booking.service';

const router = Router();
const bookingService = new BookingService();

/**
 * POST /api/bookings
 * Creates a new booking after payment initiation.
 * Body: { hotelId, roomId, checkIn, checkOut, guests, phone, paymentMethod }
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingData = req.body;
    const booking = await bookingService.createBooking(bookingData);
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;