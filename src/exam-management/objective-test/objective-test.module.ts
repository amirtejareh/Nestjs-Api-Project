import { Module } from "@nestjs/common";
import { ObjectiveTestController } from "./objective-test.controller";
import { ObjectiveTestService } from "./objective-test.service";

@Module({
  controllers: [ObjectiveTestController],
  providers: [ObjectiveTestService],
})
export class ObjectiveTestModule {}
