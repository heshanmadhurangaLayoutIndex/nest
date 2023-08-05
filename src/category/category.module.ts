import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryContent } from './entities/categoryContent.entity';
import { CaslModule } from 'src/casl/casl.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryContent]), CaslModule,
    UserModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
