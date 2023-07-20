import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
      throw UnauthorizedException;
    }

    const token = authToken.split(" ")[1];
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_KEY,
      });
      request.user = decoded;
      return true;
    } catch (err) {
      throw UnauthorizedException;
    }
  }
}
