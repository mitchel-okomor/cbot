/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as S3 from 'aws-sdk/clients/s3.js';
import {
  IStorageProvider,
  IUploadResponse,
} from '../../../interfaces/storage/common';

require('dotenv').config();

@Injectable()
export class S3Provider implements IStorageProvider {
  private logger = new Logger(S3Provider.name);
  private bucket: string;

  private s3: S3;
  private readonly configService = new ConfigService();

  constructor() {
    this.s3 = new S3({
      region: this.configService.get('AWS_BUCKET_LOCATION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    });
    this.bucket = this.configService.get('AWS_BUCKET');
  }

  async upload(file: any, filePath: string): Promise<IUploadResponse> {
    const body = Buffer.from(file.buffer);
    const mimeToExtension: Record<string, string> = {
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'docx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        'pptx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'xlsx',
      // add more as needed
    };

    const extension =
      mimeToExtension[file.mimetype] || file.mimetype.split('/')[1];

    const uploadParams: S3.Types.PutObjectRequest = {
      Bucket: this.bucket,
      Body: body,
      ContentType: file.mimetype,
      Key: filePath + `__${file.originalname.split('.')[0]}` + '.' + extension,
      ACL: 'public-read',
    };
    try {
      const data = await this.s3.upload(uploadParams).promise();
      if (!data) {
        throw new Error('No data returned from S3 upload');
      }
      this.logger.log('Uploading Image to aws: ');
      const res = this.mapResponse(data);
      return res;
    } catch (error) {
      console.log('Error uploading image to aws:', error);
      this.logger.error('Error uploading image to aws:', error);
      throw new Error('Error uploading image to aws');
    }
  }

  private mapResponse(data: S3.ManagedUpload.SendData): IUploadResponse {
    return {
      url: data?.Location,
    };
  }
}
