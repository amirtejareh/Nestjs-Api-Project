import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAnswersheetManagementDto } from "./create-answersheet-management.dto";

export class UpdateAnswersheetManagementDto extends PartialType(
  CreateAnswersheetManagementDto
) {
  readonly _id?: string;

  @ApiProperty({ type: "string", format: "binary" })
  public AnswerSheetSourceSourcePdfFile?: string[];
  public ExamSourcePdfFile?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
