import { getPool } from '../infrastructure/database';

export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  paymentId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export class BookingRepository {
  async create(data: Partial<Booking> & { userId: string; roomId: string }): Promise<Booking> {
    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO bookings (user_id, hotel_id, room_id, check_in, check_out, guests, total_price, payment_id, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *`,
      [
        data.userId,
        data.hotelId,
        data.roomId,
        data.checkIn,
        data.checkOut,
        data.guests,
        data.totalPrice,
        data.paymentId,
        data.status || 'confirmed',
      ]
    );
    return result.rows[0];
  }
}