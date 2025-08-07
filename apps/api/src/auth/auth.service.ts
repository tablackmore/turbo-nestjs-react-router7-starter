import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    // This is a demo implementation. In production, you would:
    // 1. Fetch user from database
    // 2. Compare hashed passwords
    const demoUser = {
      id: 1,
      username: 'admin',
      // Password: 'admin123' (hashed) - stored in environment variable
      password: this.configService.get<string>('demo.userPasswordHash') || '',
    };

    if (username === demoUser.username) {
      const isPasswordValid = await bcrypt.compare(password, demoUser.password);
      if (isPasswordValid) {
        const { password: _, ...result } = demoUser;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
