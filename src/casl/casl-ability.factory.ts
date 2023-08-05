import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Role } from "src/auth/enums";

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === Role.ADMIN) {
      can('manage', 'all', { id: user.id });
    } else if (user.role === Role.CALL_AGENTS) {
      can('update', 'CallAgent', { id: user.id });
    }

    return build();
  }
}