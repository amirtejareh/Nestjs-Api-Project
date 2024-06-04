import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { GradeLevel } from "../../content-management/grade-level/entities/grade-level.entity";
import { FieldOfStudy } from "../../content-management/field-of-study/entities/field-of-study.entity";
import { Province } from "../../province/entities/province.entity";
import { City } from "../../city/entities/city.entity";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly familyName?: string;
  readonly firstName?: string;
  readonly birthday?: string;
  readonly fathersName?: string;
  readonly phone?: string;
  readonly parentsPhone?: string;
  readonly gradeLevel?: GradeLevel[];
  readonly fieldOfStudy?: FieldOfStudy[];
  readonly province?: Province[];
  readonly city?: City[];
  public profilePhoto?: string;
}
