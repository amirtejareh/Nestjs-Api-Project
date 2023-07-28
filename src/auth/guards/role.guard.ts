// src/auth/guards/role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      "roles",
      context.getHandler()
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];
    const payload: JwtPayload = this.jwtService.verify(token, {
      secret: process.env.JWT_KEY,
    });
    console.log(requiredRoles);
    console.log(payload.roles);

    return this.matchRoles(requiredRoles, payload.roles);
  }

  matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    return userRoles.some((role: any) => requiredRoles.includes(role.title));
  }
}
