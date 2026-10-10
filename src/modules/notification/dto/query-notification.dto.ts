import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { PageDTO } from "src/dto/common";
import { NOTIFICATION_TYPE } from "src/enums";

export class QueryNotificationDTO extends PageDTO {
  @ApiProperty({
    example: true,
    description: "Read status of the notification",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  })
  isRead: boolean;

  @ApiProperty({
    example: NOTIFICATION_TYPE.EMAIL,
    description: "This is the type of notification",
    type: String,
    required: false,
    enum: NOTIFICATION_TYPE,
  })
  @IsOptional()
  @IsEnum(NOTIFICATION_TYPE)
  @IsNotEmpty()
  type: NOTIFICATION_TYPE;
}
