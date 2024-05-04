import { PartialType } from '@nestjs/swagger';
import { CreateReportStandardDto } from './create-report-standard.dto';

export class UpdateReportStandardDto extends PartialType(CreateReportStandardDto) {}
