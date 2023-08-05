import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

        });
    }

    async uploadFile(file: Express.Multer.File): Promise<any> {

        try {
            const params: AWS.S3.PutObjectRequest = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${process.env.AWS_S3_FOLDER}/${checkFileType(file.mimetype)}/${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            };
            return this.s3.upload(params).promise();

        } catch (err) {
            throw new Error(`S3 upload error: ${err.message}`)
        }
    }
}

function checkFileType(fileType: string) {
    if (fileType === 'image/png') {
        return 'image';
    } else if (fileType === 'video/mp4') {
        return 'video';
    } else if (fileType === 'application/pdf') {
        return 'pdf';
    } else {
        return 'other';
    }
}
