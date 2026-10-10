import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { UploadFileDTO } from "./dto/upload-file.dto";
import { GenericProviderFactory } from "../factory/provider-factory";
import { IUploadResponse } from "../../interfaces/storage/common";

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    private readonly genericProviderFactory: GenericProviderFactory
  ) {}

  uploadResource = async (data: UploadFileDTO): Promise<IUploadResponse> => {
    try {
      console.log("uploadResource: ", data);
      const res = await this.genericProviderFactory
        .resolveStorageProvider()
        .upload(data?.file, data.filePath);

      console.log("res: ", res);
      return res;
    } catch (error) {
      this.logger.error("Error uploading resource \n", error?.message);
      throw new BadRequestException("upload upload failed");
    }
  };

  deleteResource = async (paths: string[]) => {
    try {
      return this.genericProviderFactory
        .resolveStorageProvider()
        .deleteResource(paths);
    } catch (error) {
      this.logger.error("Error deleting resource\n", error);
      throw new BadRequestException("upload upload failed");
    }
  };
}
