import { PartialType } from '@nestjs/swagger';
import { CreateGradeLevelDto } from './create-grade-level.dto';

export class UpdateGradeLevelDto extends PartialType(CreateGradeLevelDto) {}
