import { CreateQuestionDto } from "./create-question.dto";

import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty({
    type: [String],
  })
  gradeLevels: string[];

  @ApiProperty({ type: [String] })
  books: string[];

  @ApiProperty({ type: [String] })
  chapters: string[];

  @ApiProperty({ type: [String] })
  sections: string[];

  @ApiProperty({ type: [String] })
  subjects: string[];

  @ApiProperty({ enum: ["easy", "average", "hard", "challenging"] })
  questionDifficulty: string;

  @ApiProperty({
    enum: ["conceptional", "computational", "trick", "memorizational"],
  })
  questionType: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  correctAnswer: number;

  @ApiProperty()
  number: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
