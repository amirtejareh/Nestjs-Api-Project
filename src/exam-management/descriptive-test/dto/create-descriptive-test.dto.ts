import { ApiProperty } from "@nestjs/swagger";

export class CreateDescriptiveTestDto {
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

  @ApiProperty({ type: [String] })
  question: string[];

  @ApiProperty()
  correctAnswer: number;

  @ApiProperty()
  examNumber: number;

  @ApiProperty()
  questionNumber: number;

  @ApiProperty({ enum: ["main", "remedial"] })
  examType: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
