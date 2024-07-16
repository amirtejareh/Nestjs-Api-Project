import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { RoleService } from "../role/role.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private roleService: RoleService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ username });
    if (!user) {
      return null;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const roleIds = user.roles;
    const roles = await this.roleService.findPermissionsOfRoles({
      _id: { $in: roleIds },
    });

    const payload = {
      username: user.username,
      sub: user._id,
      roles,
      gradeLevel: user.gradeLevel,
    };

    return {
      statusCode: 200,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
        expiresIn: process.env.EXPIRES_TIME,
      }),
    };
  }
}
