import { PartialType } from "@nestjs/swagger";
import { CreateFirstQuestionDto } from "./create-first-question.dto";
import { ComprehensiveTest } from "../../comprehensive-test/entities/comprehensive-test.entity";

export class UpdateFirstQuestionDto extends PartialType(
  CreateFirstQuestionDto
) {
  readonly id?: string;
  comprehensiveTestId: ComprehensiveTest;
  questionNumber: number;
  question: string;
  options: string[];
  guideLine: string;
}
