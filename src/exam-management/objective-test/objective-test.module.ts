import { Module } from "@nestjs/common";
import { ObjectiveTestController } from "./objective-test.controller";
import { ObjectiveTestService } from "./objective-test.service";
import { ObjectiveTestRepository } from "./objective-test.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ObjectiveTest,
  ObjectiveTestSchema,
} from "./entities/objective-test.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ObjectiveTest.name, schema: ObjectiveTestSchema },
    ]),
  ],
  controllers: [ObjectiveTestController],
  providers: [ObjectiveTestService, ObjectiveTestRepository, JwtService],
})
export class ObjectiveTestModule {}
