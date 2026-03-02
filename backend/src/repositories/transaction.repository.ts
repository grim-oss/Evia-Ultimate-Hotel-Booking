import { getPool } from '../infrastructure/database';

export interface TransactionLog {
  id: string;
  userId: string;
  type: 'payment' | 'refund';
  amount: number;
  reference: string;
  metadata: any;
  createdAt: Date;
}

export class TransactionRepository {
  async log(data: Partial<TransactionLog>): Promise<TransactionLog> {
    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO transactions (user_id, type, amount, reference, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [data.userId, data.type, data.amount, data.reference, data.metadata]
    );
    return result.rows[0];
  }
}