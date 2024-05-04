import { ApiProperty } from "@nestjs/swagger";
import { Prop } from "@nestjs/mongoose";
import { Book } from "../../../../content-management/book/entities/book.entity";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../../content-management/grade-level/entities/grade-level.entity";

export class CreateReportSubjectiveDto {
  @ApiProperty({
    description: "user",
    example: "",
  })
  user: { username: string; roles: [] };

  @ApiProperty({
    description: "questions",
    example: " [ { _id: '6634d70083ebe2a4305ef9b2', value: '-' } } ]",
  })
  question: { _id: string; value: string }[];
  @ApiProperty({
    description: "exam id",
    example: "64d5513027862ad356480ff0",
  })
  examId: string;

  @ApiProperty({ type: String })
  examTitle: string;

  @ApiProperty({ type: Number })
  examNumber: number;

  @ApiProperty({ type: Boolean })
  type: boolean;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  book: Book;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
