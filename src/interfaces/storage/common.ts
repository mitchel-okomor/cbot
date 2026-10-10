export type File = Express.Multer.File;

export interface IStorageProvider {
  upload(file: File, filePath: string): Promise<IUploadResponse | any>;
  deleteResource?(filePaths: string[]): Promise<{ status: string }>;
}
export interface IUploadResponse {
  url: string;
}
