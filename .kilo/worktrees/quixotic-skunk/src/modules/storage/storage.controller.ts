import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UploadFileDTO } from "./dto/upload-file.dto";
import { StorageService } from "./storage.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResponseModel } from "src/models/response-model";

@Controller("storage")
@ApiTags("Storage")
export class StorageController {
  private readonly logger = new Logger(StorageController.name);
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async httpUploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UploadFileDTO
  ) {
    this.logger.log("StorageController :: uploadFile :: payload %o", data);
    const response = await this.storageService.uploadResource({
      ...data,
      file,
      filePath: "download",
    });

    return ResponseModel.success("Request successful", response);
  }
}
