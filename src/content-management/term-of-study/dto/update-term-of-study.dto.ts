import { PartialType } from '@nestjs/swagger';
import { CreateTermOfStudyDto } from './create-term-of-study.dto';

export class UpdateTermOfStudyDto extends PartialType(CreateTermOfStudyDto) {}
