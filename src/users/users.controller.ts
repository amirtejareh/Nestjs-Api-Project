import { Body, Controller, Post, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "../common/decorators/roles.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { AuthService } from "../auth/auth.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RoleGuard } from "../auth/guards/role.guard";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiBearerAuth()
  @Get("")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  async findAll() {
    return this.usersService.findAll();
  }
}
