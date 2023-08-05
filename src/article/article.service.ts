import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleContent } from './entities/articleContent.entity';
import { UploadFile } from './entities/upload.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleContent)
    private articleContentRepository: Repository<ArticleContent>,
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
  ) { }
  async create(createArticleDto: CreateArticleDto) {

    const { article, path, topic_id, topic_name } = createArticleDto;

    const _upload = this.uploadFileRepository.create({ path });
    const upload = await this.uploadFileRepository.save(_upload);

    const _article = this.articleRepository.create({ topicId: topic_id, topicName: topic_name });
    const article_ = await this.articleRepository.save(_article);

    article.forEach(async (article) => {
      const _articleContent = this.articleContentRepository.create({ ...article, article: article_, uploadFile: upload });
      await this.articleContentRepository.save(_articleContent);
    });


    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
