import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";

export class CreateCreateExamDto {
  @ApiProperty({
    type: [String],
  })
  gradeLevels: string[];

  @ApiProperty({ type: [String] })
  books: string[];

  @ApiProperty({
    description: "Chapter",
    example: "64d5513027862ad356480ff0",
  })
  chapter: Chapter;

  @ApiProperty({ type: "string", format: "binary" })
  public AnswerSheetSourcePdfFile: string[];

  @ApiProperty({
    description: "Term",
    example: "64d5513027862ad356480ff0",
  })
  term: TermOfStudy;

  @ApiProperty({
    description: "the number of exam",
    example: "1",
  })
  number: String;

  @ApiProperty({ enum: ["standard", "subjective"] })
  type: string;

  @ApiProperty({ enum: ["multipleChoiceTest", "essayTest"] })
  examType?: string;
  readonly time?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
