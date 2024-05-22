import { ApiProperty } from "@nestjs/swagger";
import { ComprehensiveTest } from "../../comprehensive-test/entities/comprehensive-test.entity";

export class CreatePrimaryQuestionDto {
  readonly _id?: string;
  @ApiProperty()
  comprehensiveTestId: ComprehensiveTest;

  @ApiProperty()
  correctAnswer: number;

  @ApiProperty()
  questionNumber: number;

  @ApiProperty()
  question: string;

  @ApiProperty()
  options: string[];

  @ApiProperty()
  guideLine: string;
}
