import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";

export class CreateStandardDto {
  @ApiProperty({
    type: [String],
  })
  gradeLevels: string[];

  @ApiProperty({ type: [String] })
  books: string[];

  @ApiProperty({ type: [String] })
  chapters: string[];

  @ApiProperty({
    description: "Chapter Or Term id",
    example: "64d5513027862ad356480ff0",
  })
  readonly chapterTerm: Chapter | TermOfStudy;

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
