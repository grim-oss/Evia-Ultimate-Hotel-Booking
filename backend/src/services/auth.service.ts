import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { validateEthiopianPhone } from '../utils/phone-validator';

export class AuthService {
  private userRepo = new UserRepository();
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
  private readonly SALT_ROUNDS = 10;

  async register(phone: string, password: string, name: string) {
    // Validate phone number
    if (!validateEthiopianPhone(phone)) {
      throw new Error('Invalid Ethiopian phone number');
    }

    // Check if user already exists
    const existing = await this.userRepo.findByPhone(phone);
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user
    const user = await this.userRepo.create({ phone, password: hashedPassword, name });

    // Generate token
    const token = jwt.sign({ id: user.id, phone: user.phone }, this.JWT_SECRET, {
      expiresIn: '7d',
    });

    return { user: { id: user.id, phone: user.phone, name: user.name }, token };
  }

  async login(phone: string, password: string) {
    const user = await this.userRepo.findByPhone(phone);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, phone: user.phone }, this.JWT_SECRET, {
      expiresIn: '7d',
    });

    return { user: { id: user.id, phone: user.phone, name: user.name }, token };
  }
}