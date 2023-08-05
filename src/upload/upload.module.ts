import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { AwsService } from './services/aws.services';

@Module({
  controllers: [UploadController],
  providers: [AwsService],
})
export class UploadFileModule { }
