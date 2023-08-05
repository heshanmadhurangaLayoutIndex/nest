import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { CHECK_POLICIES_KEY } from "./check-policies.decorator";
import { PolicyHandler } from "./i-policy-handler";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

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

    const ability = this.caslAbilityFactory.createForUser({ ...payload });
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: any) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }


}