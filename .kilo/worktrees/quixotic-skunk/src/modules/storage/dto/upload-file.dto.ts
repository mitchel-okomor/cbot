import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadFileDTO {
  @IsOptional()
  filePath?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
