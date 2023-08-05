import { ArticleContent } from 'src/article/entities/articleContent.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ArticleContent, (articleContent) => articleContent.uploadFile)
  articleContent: ArticleContent[]

  @Column({
    type: 'text',
    array: true,
  })
  path: string[];

}
