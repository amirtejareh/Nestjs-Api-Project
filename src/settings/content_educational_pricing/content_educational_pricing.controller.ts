import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Res,
  UploadedFiles,
  ParseArrayPipe,
  Query,
} from "@nestjs/common";

import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { CreateContentEducationalPricingDto } from "./dto/create-content_educational_pricing.dto";
import { UpdateContentEducationalPricingDto } from "./dto/update-content_educational_pricing.dto";
import { ContentEducationalPricingService } from "./content_educational_pricing.service";

@ApiTags("Content Educational Pricing")
@Controller("content-educational-pricing")
export class ContentEducationalPricingController {
  constructor(
    private readonly contentEducationalPricingService: ContentEducationalPricingService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(
    @Res() res,
    @Body()
    createContentEducationalPricingDto: CreateContentEducationalPricingDto
  ) {
    return this.contentEducationalPricingService.create(
      res,
      createContentEducationalPricingDto
    );
  }

  @Get()
  findAll() {
    return this.contentEducationalPricingService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contentEducationalPricingService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  update(
    @Res() res,
    @Param("id") id: string,
    @Body()
    updateContentEducationalPricingDto: UpdateContentEducationalPricingDto
  ) {
    return this.contentEducationalPricingService.update(
      res,
      id,
      updateContentEducationalPricingDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.contentEducationalPricingService.remove(res, id);
  }
}
