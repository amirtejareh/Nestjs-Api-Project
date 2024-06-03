import { PartialType } from "@nestjs/swagger";
import { CreateTermOfStudyDto } from "./create-term-of-study.dto";

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class UpdateTermOfStudyDto extends PartialType(CreateTermOfStudyDto) {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of th trade of study",
    example: "Term 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان ترم تحصیلی است" })
  @Length(3, 255, { message: "عنوان کتاب باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly title: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
