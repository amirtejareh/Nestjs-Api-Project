import { PartialType } from "@nestjs/swagger";
import { CreateSubjectiveDto } from "./create-subjective.dto";

export class UpdateSubjectiveDto extends PartialType(CreateSubjectiveDto) {
  readonly _id?: string;
  readonly correctAnswer: number;
  readonly examNumber: number;
  readonly questionNumber: number;
  readonly examType: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
