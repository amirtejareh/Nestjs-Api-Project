import { PartialType } from "@nestjs/swagger";
import { CreatePrimaryQuestionDto } from "./create-primary-question.dto";
import { ComprehensiveTest } from "../../comprehensive-test/entities/comprehensive-test.entity";

export class UpdatePrimaryQuestionDto extends PartialType(
  CreatePrimaryQuestionDto
) {
  readonly id?: string;
  comprehensiveTestId: ComprehensiveTest;
  correctAnswer: number;
  questionNumber: number;
  question: string;
  options: string[];
  guideLine: string;
}
