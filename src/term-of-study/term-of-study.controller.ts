import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermOfStudyService } from './term-of-study.service';
import { CreateTermOfStudyDto } from './dto/create-term-of-study.dto';
import { UpdateTermOfStudyDto } from './dto/update-term-of-study.dto';

@Controller('term-of-study')
export class TermOfStudyController {
  constructor(private readonly termOfStudyService: TermOfStudyService) {}

  @Post()
  create(@Body() createTermOfStudyDto: CreateTermOfStudyDto) {
    return this.termOfStudyService.create(createTermOfStudyDto);
  }

  @Get()
  findAll() {
    return this.termOfStudyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termOfStudyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermOfStudyDto: UpdateTermOfStudyDto) {
    return this.termOfStudyService.update(+id, updateTermOfStudyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termOfStudyService.remove(+id);
  }
}
