
import { Category } from 'src/category/entities/category.entity';
import { User } from '../../../src/user/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinTable,
    ManyToMany,
    OneToMany
} from 'typeorm';
import { Action } from './action.entity';

@Entity('user_feature_category')
export class UserFeatureCategory {

    @PrimaryGeneratedColumn()
    id: string;

    // @OneToMany(() => Category, (categories) => categories.userFeatureCategorys)
    // categories: Category[]

    @OneToMany(() => User, (users) => users.userFeatureCategorys)
    users: User[]

    @OneToMany(() => Action, (action) => action.userFeatureCategorys)
    actions: Action[]

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}