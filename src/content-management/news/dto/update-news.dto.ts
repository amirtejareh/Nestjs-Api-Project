import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class UpdateNewsDto {
  @ApiProperty({
    description: "Title of the news",
    example: "Math",
  })
  @IsNotEmpty({ message: "فیلد عنوان خبر اجباری است" })
  @Length(3, 255, { message: "عنوان خبر باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly title: string;

  @ApiProperty({
    description: "Title of the news",
    example: "Math",
  })
  @IsNotEmpty({ message: "فیلد توضیحات خبر اجباری است" })
  readonly description: string;

  @ApiProperty({ type: "string", format: "binary" })
  public image: any;

  @ApiProperty({
    description: "The status of the news publishment",
    example: "false",
  })
  isPublished: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
