import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectiveDto {
  @ApiProperty()
  correctAnswer: number;

  @ApiProperty()
  examNumber: number;

  @ApiProperty()
  questionNumber: number;

  @ApiProperty({ enum: ["multipleChoiceTest", "essayTest"] })
  examType: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
