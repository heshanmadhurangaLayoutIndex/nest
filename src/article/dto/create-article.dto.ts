import { IsUUID, IsArray, IsString, ValidateNested, IsNotEmpty, IsIn, ArrayNotEmpty, ArrayMinSize, MinLength, IsEnum } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

enum SupportedLanguages {
    SINHALA = 'si',
    TAMIL = 'ta',
    ENGLISH = 'en',
    OTHER = 'other',
}

class ArticleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    topic_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    tittle: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    description: string;

    @IsEnum(SupportedLanguages)
    language: string;
}

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    topic_id: string;

    @IsString()
    @IsNotEmpty()
    topic_name: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    path: string[];

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    article: ArticleDto[];
}


