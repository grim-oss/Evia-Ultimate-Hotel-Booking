import { getPool } from '../infrastructure/database';

export interface PaymentRecord {
  id: string;
  transactionId: string;
  userId: string;
  bookingId?: string;
  amount: number;
  method: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
}

export class PaymentRepository {
  async create(data: Partial<PaymentRecord>): Promise<PaymentRecord> {
    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO payments (transaction_id, user_id, booking_id, amount, method, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [data.transactionId, data.userId, data.bookingId, data.amount, data.method, data.status]
    );
    return result.rows[0];
  }
}