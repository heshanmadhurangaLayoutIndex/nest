import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne

} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Article } from './article.entity';
import { UploadFile } from 'src/article/entities/upload.entity';

@Entity('article_content')
export class ArticleContent {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Article, (article) => article.articleContent)
    article: Article;

    @ManyToOne(() => UploadFile, (upload) => upload.articleContent)
    uploadFile: UploadFile;

    @Column()
    topic_name: string;

    @Column()
    tittle: string;

    @Column()
    language: string;

    @Column()
    description: string


    constructor() {
        this.id = uuidv4();
    }
}