import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from './entities/upload.entity';
import { ArticleContent } from './entities/articleContent.entity';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile, ArticleContent, Article])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
