import { getPool } from '../infrastructure/database';

export interface User {
  id: string;
  phone: string;
  password: string;
  name: string;
  createdAt: Date;
}

export class UserRepository {
  async findByPhone(phone: string): Promise<User | null> {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    return result.rows[0] || null;
  }

  async create(data: { phone: string; password: string; name: string }): Promise<User> {
    const pool = getPool();
    const result = await pool.query(
      'INSERT INTO users (phone, password, name, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [data.phone, data.password, data.name]
    );
    return result.rows[0];
  }
}