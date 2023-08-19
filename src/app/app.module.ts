import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { SeedModule } from "../seed/seed.module";

import { FieldOfStudyModule } from "../content-management/field-of-study/field-of-study.module";
import { GradeLevelModule } from "../content-management/grade-level/grade-level.module";
import { TermOfStudyModule } from "../content-management/term-of-study/term-of-study.module";
import { BookModule } from "../content-management/book/book.module";
import { ImageService } from "../common/services/imageService";
import { ChapterModule } from "../content-management/chapter/chapter.module";
import { SectionModule } from "../content-management/section/section.module";
import { SubjectModule } from "../content-management/subject/subject.module";
import { ObjectiveTestModule } from "../exam-management/objective-test/objective-test.module";
import { QuestionModule } from "../exam-management/question/question.module";
import { ObjectiveTestManagementModule } from "../exam-management/objective-test-management/objective-test-management.module";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/karanbala"),
    UsersModule,
    SeedModule,
    AuthModule,
    FieldOfStudyModule,
    GradeLevelModule,
    TermOfStudyModule,
    BookModule,
    ChapterModule,
    SectionModule,
    SubjectModule,
    ObjectiveTestModule,
    QuestionModule,
    ObjectiveTestManagementModule,
  ],
  providers: [ImageService],

  controllers: [AppController],
})
export class AppModule {}
