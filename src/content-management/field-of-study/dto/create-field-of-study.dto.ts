import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
export class CreateFieldOfStudyDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of th field of study",
    example: "Math",
  })
  @IsNotEmpty({ message: "فیلد عنوان رشته تحصیلی اجباری است" })
  @Length(4, 20, { message: "نام کاربری باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  readonly gradeLevels?: GradeLevel[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
