import { Module } from "@nestjs/common";
import { ComprehensiveTestController } from "./comprehensive-test.controller";
import { ComprehensiveTestRepository } from "./comprehensive-test.repository";
import {
  ComprehensiveTest,
  ComprehensiveTestSchema,
} from "./entities/comprehensive-test.entity";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";
import { ComprehensiveTestService } from "./comprehensive-test.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComprehensiveTest.name, schema: ComprehensiveTestSchema },
    ]),
  ],
  controllers: [ComprehensiveTestController],
  providers: [
    ComprehensiveTestService,
    ComprehensiveTestRepository,
    JwtService,
    ImageService,
  ],
})
export class ComprehensiveTestModule {}
