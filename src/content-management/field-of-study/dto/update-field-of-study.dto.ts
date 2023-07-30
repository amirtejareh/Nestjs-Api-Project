import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFieldOfStudyDto } from "./create-field-of-study.dto";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";

export class UpdateFieldOfStudyDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of th field of study",
    example: "Math",
  })
  @IsNotEmpty({ message: "فیلد عنوان رشته تحصیلی اجباری است" })
  @Length(3, 20, { message: "عنوان رشته تحصیلی باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  @ApiProperty({
    description: "Grade levels",
    example: "Math",
  })
  readonly gradeLevels: GradeLevel[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
