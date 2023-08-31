import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Res, UploadedFile, UploadedFiles, ParseArrayPipe } from '@nestjs/common';
// import { LearningMaterialService } from './learning-material.service';
// import { CreateLearningMaterialDto } from './dto/create-learning-material.dto';
// import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { BookExercisesService } from './book-exercises.service';
import { CreateBookExercisesDto } from './dto/create-book-exercises.dto';
import { UpdateBookExercisesDto } from './dto/update-book-exercises.dto';

@ApiTags("Book Exercises")
@Controller('book-exercises')
export class BookExercisesController {
  constructor(private readonly bookExercisesService: BookExercisesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createLearningMaterialDto: CreateBookExercisesDto
  ) {
    return this.bookExercisesService.create(res, pdfFiles, createLearningMaterialDto);
  }

  @Get()
  findAll() {
    return this.bookExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookExercisesService.findOne(id);
  }

  @Get("withSubjects/:subjectsId")
  async findBookExercisesBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }

    return this.bookExercisesService.findBasedOnSubjects(subjects);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body() updateBookExercisesDto: UpdateBookExercisesDto,) {
    return this.bookExercisesService.update(res, pdfFiles, id, updateBookExercisesDto);
  }

  @Delete(':id')
  remove(@Res() res,
    @Param('id') id: string) {
    return this.bookExercisesService.remove(res, id);
  }
}
