import { Controller, Post, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "../common/decorators/roles.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../auth/guards/role.guard";

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
}
