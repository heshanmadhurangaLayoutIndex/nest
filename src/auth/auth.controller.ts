// auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service'; // Assuming you have a user service to handle user-related operations
import { LoginUserDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    // Find the user in the database based on the provided EMAIL (should be unique)
    const user = await this.userService.findOneByEmail(email);


    if (!user || !await this.userService.verifyPassword(password, user.password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // If the user is found and the password is correct, create a JWT token
    const payload: JwtPayload = { sub: user.id, username: user.email, role: user.role };

    const token = this.jwtService.sign(payload);

    delete user.password;

    return { token, user };
  }
}
