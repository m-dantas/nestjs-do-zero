import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";
import { CreateTaskDTO } from "./create-task.dto";

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}