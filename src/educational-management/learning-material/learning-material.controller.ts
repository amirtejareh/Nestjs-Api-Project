import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { CreateLearningMaterialDto } from './dto/create-learning-material.dto';
import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';

@Controller('learning-material')
export class LearningMaterialController {
  constructor(private readonly learningMaterialService: LearningMaterialService) {}

  @Post()
  create(@Body() createLearningMaterialDto: CreateLearningMaterialDto) {
    return this.learningMaterialService.create(createLearningMaterialDto);
  }

  @Get()
  findAll() {
    return this.learningMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearningMaterialDto: UpdateLearningMaterialDto) {
    return this.learningMaterialService.update(+id, updateLearningMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningMaterialService.remove(+id);
  }
}
