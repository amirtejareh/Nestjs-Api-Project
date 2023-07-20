import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MissingFieldsException } from "../../exception/missing-fields-exception";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post("/signup")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;

    if (!createUserDto.password) {
      throw new MissingFieldsException("password");
    }
    if (!createUserDto.username) {
      throw new MissingFieldsException("username");
    }
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );

    const createUser = {
      username: createUserDto.username,
      password: hashedPassword,
    };
    const result = await this.usersService.createUser(createUser);
    return result;
  }

  @Post("/signin")
  async singinUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      throw new MissingFieldsException("password");
    }
    if (!createUserDto.username) {
      throw new MissingFieldsException("username");
    }

    const user = await this.authService.validateUser(
      createUserDto.username,
      createUserDto.password
    );

    if (user == null) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    return await this.authService.login(user);
  }
}
