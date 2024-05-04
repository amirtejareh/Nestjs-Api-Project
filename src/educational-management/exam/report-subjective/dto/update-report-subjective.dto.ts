import { PartialType } from "@nestjs/swagger";
import { CreateReportSubjectiveDto } from "./create-report-subjective.dto";

export class UpdateReportSubjectiveDto extends PartialType(
  CreateReportSubjectiveDto
) {}
