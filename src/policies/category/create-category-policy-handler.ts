import { Injectable } from '@nestjs/common';
import { Category } from 'src/category/entities/category.entity';
import { Action } from 'src/casl/action.enum';
// import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from '../i-policy-handler'

@Injectable()
export class CreateCategoryPolicyHandler implements IPolicyHandler {
    handle(ability: any) {
        // ability.can(Action.Delete, typeof Category);
        ability.can(Action.Read, typeof Category);
        // console.log(ability);

        return ability;
    }
}
export const createCategoryPolicyHandler = new CreateCategoryPolicyHandler()