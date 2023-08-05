import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(token: any) {
    return token
  }

  async decodeToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    }
    catch (err) {
      return null;
    }
  }
}