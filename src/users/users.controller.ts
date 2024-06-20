import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Patch,
  Res,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "../common/decorators/roles.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../auth/guards/role.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("User")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("User")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get("withUsername/:username")
  getUserBasedOnUsername(@Res() res, @Param("username") username: string) {
    return this.usersService.getUserBasedOnUsername(res, username);
  }

  @Patch(":username")
  @UseInterceptors(FileInterceptor("profilePhoto"))
  @ApiConsumes("multipart/form-data")
  update(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Param("username") username: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(res, file, username, updateUserDto);
  }
}
