import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/user/entities/user.entity';
@Module({
  imports: [
    JwtModule.register({
      secret: 'LAYOIUTINDEXLAYERJWTSECRET/s',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
