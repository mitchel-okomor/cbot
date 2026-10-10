import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { GenericProviderFactory } from '../factory/provider-factory';
import { S3Provider } from '../providers/storage/s3.provider';

@Module({
  controllers: [StorageController],
  imports: [],
  providers: [StorageService, S3Provider, GenericProviderFactory],
})
export class StorageModule {}
