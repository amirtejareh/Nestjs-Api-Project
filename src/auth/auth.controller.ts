import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ValidationPipe,
  ConflictException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MissingFieldsException } from "../common/exception/missing-fields-exception";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { NationalCodeHelper } from "../common/utils/national-code.helper";
import { InvalidNationalIdException } from "../common/exception/invalid-national-id-exception";
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  private saltOrRounds = 10;

  @Post("/signup")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, email, mobile, national_id_number } = createUserDto;

    const existingUser = await this.usersService.getUser({ username });
    if (existingUser) {
      throw new ConflictException(
        "کاربری با این نام کاربری قبلاً ثبت نام کرده است"
      );
    }

    if (!NationalCodeHelper.isValidIranianNationalId(national_id_number)) {
      throw new InvalidNationalIdException();
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds
    );

    const createUser = {
      username,
      email,
      mobile,
      national_id_number,
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
