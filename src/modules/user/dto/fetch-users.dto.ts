import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { PageDTO } from "src/dto/common/page.dto";
import { ROLE } from "src/enums";
import { Transform } from "class-transformer";

export class FetchUsersDTO extends PageDTO {
  @ApiProperty({
    example: "d839884d-8bf6-42ea-bbfc-7f56b189ffeb",
    description: "This is the team id",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  team: string;

  @ApiProperty({
    example: ROLE.USER,
    description: "This is the user role",
    type: String,
    required: false,
    enum: ROLE,
  })
  @IsOptional()
  @IsEnum(ROLE)
  @IsNotEmpty()
  role?: ROLE;

  @ApiProperty({
    example: true,
    description: "Wether or not user completed onboarding",
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
  isOnboardingComplete: boolean;
}
