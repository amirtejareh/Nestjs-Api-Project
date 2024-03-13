import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";

export class CreateStandardDto {
  @ApiProperty()
  correctAnswer: number;

  @ApiProperty()
  examNumber: number;

  @ApiProperty()
  questionNumber: number;

  @ApiProperty()
  time: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
