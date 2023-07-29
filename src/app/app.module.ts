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
  ],
  controllers: [AppController],
})
export class AppModule {}
