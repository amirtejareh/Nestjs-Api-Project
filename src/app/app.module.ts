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
import { LearningMaterialModule } from "../educational-management/learning-material/learning-material.module";
import { ObjectiveTestManagementModule } from "../exam-management/objective-test-management/objective-test-management.module";
import { EssayQuestionModule } from "../educational-management/essay-questions/essay-questions.module";
import { BookReferenceModule } from "../content-management/book-reference/book-reference.module";
import { TipAndTestModule } from "../educational-management/tip-and-test/tip-and-test.module";
import { KaranbalaModule } from "../educational-management/karanbala/karanbala.module";
import { BookIntroModule } from "../educational-management/book-intro/book-intro.module";
import { OnlineGradeReportModule } from "../exam-management/online-grade-report/online-grade-report.module";
import { AnswersheetManagementModule } from "../exam-management/answersheet-management/answersheet-management.module";
import { SampleExampleQuestionsModule } from "../educational-management/sample-example-questions/sample-example-questions.module";
import { AttachModule } from "../educational-management/attach/attach.module";
import { SampleTestQuestionsModule } from "../educational-management/sample-test-questions/sample-test-questions.module";
import { StandardModule } from "../educational-management/exam/standard/standard.module";
import { CreateExamModule } from "../educational-management/exam/create/create.module";
import { SubjectiveModule } from "../educational-management/exam/subjective/subjective.module";
import { ReportStandardModule } from "../educational-management/exam/report-standard/report-standard.module";
import { ReportSubjectiveModule } from "../educational-management/exam/report-subjective/report-subjective.module";
import { ComprehensiveTestModule } from "../educational-management/comprehensive-test/comprehensive-test.module";
import { PrimaryQuestionModule } from "../educational-management/comprehensive-primary-question/primary-question.module";
import { FirstQuestionModule } from "../educational-management/comprehensive-first-question/first-question.module";
import { SecondQuestionModule } from "../educational-management/comprehensive-second-question/second-question.module";
import { CityModule } from "../city/city.module";
import { ProvinceModule } from "../province/province.module";
import { NewsModule } from "../content-management/news/news.module";
import { PaymentModule } from "../payment/payment.module";
import { ContentEducationalPricingModule } from "../settings/content_educational_pricing/content_educational_pricing.module";
import { ConfigModule } from "@nestjs/config";

const ENV = process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
    }),
    MongooseModule.forRoot("mongodb://127.0.0.1/karanbala"),
    UsersModule,
    SeedModule,
    AuthModule,
    FieldOfStudyModule,
    GradeLevelModule,
    TermOfStudyModule,
    BookModule,
    PaymentModule,
    BookReferenceModule,
    ChapterModule,
    NewsModule,
    SectionModule,
    SubjectModule,
    SampleTestQuestionsModule,
    PrimaryQuestionModule,
    FirstQuestionModule,
    SecondQuestionModule,
    StandardModule,
    SubjectiveModule,
    CityModule,
    ProvinceModule,
    ObjectiveTestModule,
    QuestionModule,
    CreateExamModule,
    ComprehensiveTestModule,
    OnlineGradeReportModule,
    AnswersheetManagementModule,
    LearningMaterialModule,
    SampleExampleQuestionsModule,
    AttachModule,
    ObjectiveTestManagementModule,
    ReportStandardModule,
    ReportSubjectiveModule,
    EssayQuestionModule,
    TipAndTestModule,
    KaranbalaModule,
    BookIntroModule,
    ContentEducationalPricingModule,
  ],
  providers: [ImageService],

  controllers: [AppController],
})
export class AppModule {}
