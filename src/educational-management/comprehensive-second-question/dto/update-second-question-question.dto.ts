import { PartialType } from "@nestjs/swagger";
import { CreateSecondQuestionDto } from "./create-second-question.dto";
import { ComprehensiveTest } from "../../comprehensive-test/entities/comprehensive-test.entity";

export class UpdateSecondQuestionDto extends PartialType(
  CreateSecondQuestionDto
) {
  readonly id?: string;
  comprehensiveTestId: ComprehensiveTest;
  questionNumber: number;
  question: string;
  options: string[];
  guideLine: string;
}
