import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../../common/services/imageService';
import { Karanbala, KaranbalaSchema } from './entities/karanbala.entity';
import { KaranbalaController } from './karanbala.controller';
import { KaranbalaService } from './karanbala.service';
import { KaranbalaRepository } from './karanbala.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Karanbala.name, schema: KaranbalaSchema },
    ]),
  ],
  controllers: [KaranbalaController],
  providers: [KaranbalaService, KaranbalaRepository, JwtService, ImageService]
})
export class KaranbalaModule { }
