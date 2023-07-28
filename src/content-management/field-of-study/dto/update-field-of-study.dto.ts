import { PartialType } from '@nestjs/swagger';
import { CreateFieldOfStudyDto } from './create-field-of-study.dto';

export class UpdateFieldOfStudyDto extends PartialType(CreateFieldOfStudyDto) {}
