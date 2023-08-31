import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../../common/services/imageService';
import { TipAndTestController } from './tip-and-test.controller';
import { TipAndTestService } from './tip-and-test.service';
import { TipAndTestRepository } from './tip-and-test.repository';
import { TipAndTest, TipAndTestSchema } from './entities/tip-and-test.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TipAndTest.name, schema: TipAndTestSchema },
    ]),
  ],
  controllers: [TipAndTestController],
  providers: [TipAndTestService, TipAndTestRepository, JwtService, ImageService]
})
export class TipAndTestModule { }
