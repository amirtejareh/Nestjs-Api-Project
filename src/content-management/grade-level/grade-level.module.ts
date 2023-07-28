import { Module } from "@nestjs/common";
import { GradeLevelService } from "./grade-level.service";
import { GradeLevelController } from "./grade-level.controller";
import { GradeLevelRepository } from "./grade-level.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { GradeLevelSchema } from "./entities/grade-level.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "gradeLevel", schema: GradeLevelSchema },
    ]),
  ],
  controllers: [GradeLevelController],
  providers: [GradeLevelService, GradeLevelRepository],
})
export class GradeLevelModule {}
