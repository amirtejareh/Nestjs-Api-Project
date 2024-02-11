import { Module } from "@nestjs/common";
import { AttachService } from "./attach.service";
import { AttachController } from "./attach.controller";
import { JwtService } from "@nestjs/jwt";
import { AttachRepository } from "./attach.repository";
import { ImageService } from "../../common/services/imageService";
import { MongooseModule } from "@nestjs/mongoose";
import { Attach, AttachSchema } from "./entities/attach.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attach.name,
        schema: AttachSchema,
      },
    ]),
  ],
  controllers: [AttachController],
  providers: [AttachService, AttachRepository, JwtService, ImageService],
})
export class AttachModule {}
