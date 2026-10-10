import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsString,
  IsEnum,
  IsDateString,
  Max,
  Min,
} from "class-validator";
import { SORT_BY, SORT_ORDER } from "../../enums";

export class Amount {
  @ApiProperty({
    example: 500,
    type: Number,
    required: false,
    description: "Fixed amount",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  equals?: number;

  @ApiProperty({
    example: 100,
    type: Amount,
    required: false,
    description: "Minimum amount range",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  min?: number;

  @ApiProperty({
    example: 1000,
    type: Amount,
    required: false,
    description: "Maximum amount range",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  max?: number;
}

export class TimeFrameDTO {
  @ApiProperty({
    example:
      "today | yesterday | this_week | last_week | this_month | last_month | year | 2m | 3d | 4y | 5w",
    description: "duration filter",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  timeFrame: string;
}

export class PageDTO {
  @ApiProperty({
    example: 1,
    type: Number,
    required: false,
    description:
      "Current page. This is optional and default is 1 that is the first page",
  })
  @IsOptional()
  @Min(1)
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number(value))
  pageNumber?: number;

  @ApiProperty({
    type: Number,
    required: false,
    example: 5,
    description:
      "Number of data output to be displayed for each page. This is optional and default is 10",
  })
  @IsOptional()
  @Max(100)
  @Min(1)
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number(value))
  perPage?: number;

  @ApiProperty({
    example: "any thing",
    description: "Any other query",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    example:
      "today | yesterday | week | this_month | month | year | 2m | 3d | 4y | 5w",
    description: "duration filter",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  timeFrame: string;

  @ApiProperty({
    example: SORT_ORDER.DESC,
    description: "sort order",
    type: String,
    required: false,
    enum: SORT_ORDER,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER)
  @IsNotEmpty()
  sortOrder: SORT_ORDER;

  @ApiProperty({
    example: SORT_BY.CREATEDAT,
    description: "sort by",
    type: String,
    required: false,
    enum: SORT_BY,
  })
  @IsOptional()
  @IsString()
  @IsEnum(SORT_BY)
  sortBy: SORT_BY;

  @ApiProperty({
    example: "2024-10-01T03:10:00.020",
    description: "start date range",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  startDate?: Date;

  @ApiProperty({
    example: "2024-10-17T03:10:00.020",
    description: "end date range",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  endDate?: Date;

  @ApiProperty({
    example: 100,
    type: Number,
    required: false,
    description: "Minimum range",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  min?: number;

  @ApiProperty({
    example: 1000,
    type: Number,
    required: false,
    description: "Maximum range",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  max?: number;

  getSort() {
    const sort = {};

    if (this.sortBy && this.sortOrder) {
      sort[this.sortBy] = this.sortOrder;
    } else if (this.sortBy) {
      sort[this.sortBy] = "DESC";
    } else if (this.sortOrder) {
      sort["createdAt"] = this.sortOrder;
    } else {
      sort["createdAt"] = "DESC";
    }

    return sort;
  }

  public getSkip?(): number {
    return (this.pageNumber - 1) * this.perPage;
  }
}

export class PaginationMetaDTO {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty({ example: "lastMonth" })
  timeFrame: string;
}
