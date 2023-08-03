import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateChapterDto } from "./create-chapter.dto";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the chapter",
    example: "Chapter 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان فصل اجباری است" })
  @Length(3, 20, { message: "عنوان فصل باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  readonly gradeLevels: GradeLevel[];
  readonly books: Book[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
