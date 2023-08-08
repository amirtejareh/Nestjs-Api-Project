import { PartialType } from "@nestjs/swagger";
import { CreateObjectiveTestDto } from "./create-objective-test.dto";

export class UpdateObjectiveTestDto extends PartialType(
  CreateObjectiveTestDto
) {}
