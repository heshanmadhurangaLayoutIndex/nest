import { Role } from '../../../src/auth/enums';
import { UserFeatureCategory } from '../../../src/user/entities/user-feature-category.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => UserFeatureCategory, (userFeatureCategory) => userFeatureCategory.users)
    userFeatureCategorys: UserFeatureCategory;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    employeeId: string

    @Column({ nullable: true })
    userId: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ default: Role.USER })
    role: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    status: boolean;

}
