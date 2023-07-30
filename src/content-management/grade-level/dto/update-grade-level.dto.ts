import { PartialType } from "@nestjs/swagger";
import { CreateGradeLevelDto } from "./create-grade-level.dto";

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { Book } from "../../book/entities/book.entity";
import { TermOfStudy } from "../../term-of-study/entities/term-of-study.entity";
export class UpdateGradeLevelDto extends PartialType(CreateGradeLevelDto) {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of th grade level",
    example: "second",
  })
  @IsNotEmpty({ message: "فیلد عنوان پایه تحصیلی است" })
  @Length(3, 20, { message: "عنوان کارپایه تحصیلی باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  @Length(3, 5000, {
    message: "توضیحات پایه تحصیلی باید بین ۳ تا ۵۰۰۰ حرف باشد",
  })
  readonly description: string;

  @ApiProperty({ type: "string", format: "binary" })
  public image?: any;

  readonly books?: Book[];
  readonly terms?: TermOfStudy[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
