import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserAbilityFactory } from '../factory/user-ability.factory';
import { log } from 'console';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
        private readonly userAbilityFactory: UserAbilityFactory,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            const roles = this.reflector.get<string[]>('roles', context.getHandler());

            if (!roles) {
                return false
            }

            // Check JWT token and validate user
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new NotFoundException('Token not found');
            }


            const payload: any = await this.authService.decodeToken(token);

            if (!payload) {
                return false;
            }

            const userAbilities: any = this.userAbilityFactory.createForUser(payload);

            const isAuthorized = roles.some((role) => payload.role === role);

            // Check if the user has the ability to "manage" the "all" subject
            if (isAuthorized && userAbilities.p === 'manage' && userAbilities.g === 'all') {
                // If the user has the required abilities, allow access
                return true;
            } else {
                // If the user doesn't have the required abilities, deny access
                return false;
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }




    }


}
