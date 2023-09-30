import { Module } from "@nestjs/common";
import { DescriptiveTestController } from "./descriptive-test.controller";
import { DescriptiveTestService } from "./descriptive-test.service";
import { DescriptiveTestRepository } from "./descriptive-test.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DescriptiveTest,
  DescriptiveTestSchema,
} from "./entities/descriptive-test.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DescriptiveTest.name, schema: DescriptiveTestSchema },
    ]),
  ],
  controllers: [DescriptiveTestController],
  providers: [DescriptiveTestService, DescriptiveTestRepository, JwtService],
})
export class DescriptiveTestModule { }
