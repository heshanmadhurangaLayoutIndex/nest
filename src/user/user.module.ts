import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserFeatureCategory } from './entities/user-feature-category.entity';
import { Action } from './entities/action.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserAbilityFactory } from 'src/auth/factory/user-ability.factory';
import { AuthService } from 'src/auth/auth.service';
import { MailingModule } from 'src/mail/mailing.module';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([User, UserFeatureCategory, Action]), MailingModule],
  controllers: [UserController],
  providers: [UserService, UserAbilityFactory, AuthService],
  exports: [UserService],
})
export class UserModule { }
