import { ApiProperty } from "@nestjs/swagger";

export class ResponseModelDTO<TData> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: "fetched successfully" })
  message: string;

  @ApiProperty({ required: false })
  data: TData;
}
