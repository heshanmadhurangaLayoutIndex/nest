import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,

} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ArticleContent } from './articleContent.entity';

@Entity('article')
export class Article {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => ArticleContent, (articleContent) => articleContent.article)
    articleContent: ArticleContent[]

    @Column()
    topicId: string;

    @Column()
    topicName: string

    @CreateDateColumn()
    date: Date

    constructor() {
        this.id = uuidv4();
    }
}