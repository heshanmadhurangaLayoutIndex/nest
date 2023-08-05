import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { multerConfig } from '../config/multer.config';
import { AwsService } from '../services/aws.services';
import { ResponseDto } from '../dto/response.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly awsService: AwsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<ResponseDto> {
    return this.awsService.uploadFile(file);
  }
}
