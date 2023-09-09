import { Module } from "@nestjs/common";

import {
  AnswersheetManagement,
  AnswersheetManagementSchema,
} from "./entities/answersheet-management.entity";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";
import { AnswersheetManagementController } from "./answersheet-management.controller";
import { AnswersheetManagementService } from "./answersheet-management.service";
import { AnswersheetManagementRepository } from "./answersheet-management.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnswersheetManagement.name, schema: AnswersheetManagementSchema },
    ]),
  ],
  controllers: [AnswersheetManagementController],
  providers: [
    AnswersheetManagementService,
    AnswersheetManagementRepository,
    JwtService,
    ImageService,
  ],
})
export class AnswersheetManagementModule {}
