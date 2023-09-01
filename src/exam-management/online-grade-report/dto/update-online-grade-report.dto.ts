import { PartialType } from '@nestjs/swagger';
import { CreateOnlineGradeReportDto } from './create-online-grade-report.dto';

export class UpdateOnlineGradeReportDto extends PartialType(CreateOnlineGradeReportDto) {}
