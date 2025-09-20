import { IsInt, IsOptional, Max, Min } from "class-validator"
import { Type } from "class-transformer"

export class PaginationDTO {
  @IsInt()
  @IsOptional()
  @Max(50)
  @Min(1)
  @Type(() => Number)
  limit: number

  @IsInt()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset: number
}