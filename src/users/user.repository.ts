import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { RoleService } from "../role/role.service";
import { CreateRoleDto } from "../role/dto/create-role.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ImageService } from "../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel("user") private readonly userModel: Model<User>,
    private readonly roleService: RoleService,
    private readonly imageService: ImageService
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const role: CreateRoleDto = await this.roleService.findOneByTitle("User");
    return this.userModel.create({
      ...createUserDto,
      roles: [role._id],
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query).populate(["gradeLevel"]);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }

  async getUserBasedOnUsername(
    @Res() res,
    @Param("username") username: string
  ) {
    try {
      const User = await this.userModel.find({ username }).populate([
        "city",
        {
          path: "roles",
          populate: [
            {
              path: "permissions",
              model: "Permission",
            },
          ],
        },
      ]);

      if (!User) {
        throw new NotFoundException("کاربر مورد نظر یافت نشد.");
      }

      return res.status(200).json(User);
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async update(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Param("username") username: string,
    updateUserDto: UpdateUserDto
  ) {
    try {
      const User = await this.userModel.find({ username });

      if (!User) {
        throw new NotFoundException("کاربر مورد نظر یافت نشد.");
      }
      const saltOrRounds = 10;

      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(
          updateUserDto.password,
          saltOrRounds
        );
        updateUserDto.password = hashedPassword;
      }

      if (file) {
        const fileName = await this.imageService.saveImage(
          `content_management/profile_photo/${User[0]?._id}`,
          file
        );

        updateUserDto.profilePhoto = fileName;
        if (existsSync(User[0]?.profilePhoto)) {
          try {
            fs.unlinkSync(`${User[0]?.profilePhoto}`);
          } catch (err) {
            throw new InternalServerErrorException(
              "خطایی در حذف فایل قدیمی رخ داده است."
            );
          }
        }
      }

      let count = 0;

      if (User[0].gradeLevelMaxUpdated >= 0) {
        if (User[0].gradeLevelMaxUpdated < 3) {
          count = User[0].gradeLevelMaxUpdated + 1;
        } else {
          count = 3;
        }
      } else {
        count = 1;
      }

      if (count == 3) {
        delete updateUserDto.gradeLevel;
      }

      const updateUserModel = await this.userModel.findOneAndUpdate(
        { email: User[0].email },
        { ...updateUserDto, gradeLevelMaxUpdated: count },
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "کاربر با موفقیت بروزرسانی شد.",
        data: updateUserModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }
}
