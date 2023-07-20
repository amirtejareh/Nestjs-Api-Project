import { Controller, Get, Param } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Role } from "./entities/role.entity";

@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(":title")
  async findOneByTitle(@Param("title") title: string): Promise<Role> {
    return this.roleService.findOneByTitle(title);
  }
}
