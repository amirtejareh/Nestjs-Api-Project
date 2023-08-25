import { Module } from "@nestjs/common";
import { ObjectiveTestManagementService } from "./objective-test-management.service";
import { ObjectiveTestManagementController } from "./objective-test-management.controller";
import { ObjectiveTestManagementRepository } from "./objective-test-management.repository";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ObjectiveTestManagement,
  ObjectiveTestManagementSchema,
} from "./entities/objective-test-management.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ObjectiveTestManagement.name,
        schema: ObjectiveTestManagementSchema,
      },
    ]),
  ],
  controllers: [ObjectiveTestManagementController],
  providers: [
    ObjectiveTestManagementService,
    ObjectiveTestManagementRepository,
    JwtService,
  ],
})
export class ObjectiveTestManagementModule {}
