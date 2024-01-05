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
import { SigninUserDto } from "../users/dto/signin-user-dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  private saltOrRounds = 10;

  @Post("/signup")
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { username, email, mobile, national_id_number } = createUserDto;

    const existingUserByUsername = await this.usersService.getUser({
      username,
    });
    const existingUserByMobile = await this.usersService.getUser({ mobile });
    const existingUserEmail = await this.usersService.getUser({ email });
    const existingUserNationalIdNumber = await this.usersService.getUser({
      national_id_number,
    });
    if (existingUserByUsername) {
      throw new ConflictException(
        "کاربری با این نام کاربری قبلاً ثبت نام کرده است"
      );
    }
    if (existingUserEmail) {
      throw new ConflictException("کاربری با این ایمیل قبلاً ثبت نام کرده است");
    }

    if (existingUserByMobile) {
      throw new ConflictException(
        "کاربری با این موبایل قبلاً ثبت نام کرده است"
      );
    }

    if (!NationalCodeHelper.isValidIranianNationalId(national_id_number)) {
      throw new InvalidNationalIdException();
    }

    if (existingUserNationalIdNumber) {
      throw new ConflictException("کاربری با این کدملی قبلاً ثبت نام کرده است");
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
    return {
      statusCode: 200,
      ...result,
    };
  }

  @Post("/signin")
  async singinUser(@Body() signinUserDto: SigninUserDto) {
    if (!signinUserDto.password) {
      throw new MissingFieldsException("password");
    }
    if (!signinUserDto.username) {
      throw new MissingFieldsException("username");
    }

    const user = await this.authService.validateUser(
      signinUserDto.username,
      signinUserDto.password
    );

    if (user == null) {
      throw new UnauthorizedException("کاربری با این مشخصات یافت نشد.");
    }

    return await this.authService.login(user);
  }
}
