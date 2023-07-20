import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { MissingFieldsException } from "../../exception/missing-fields-exception";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
