import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { RoleService } from "../role/role.service";
import { CreateRoleDto } from "../role/dto/create-role.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel("user") private readonly userModel: Model<User>,
    private readonly roleService: RoleService
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const role: CreateRoleDto = await this.roleService.findOneByTitle("User");
    return this.userModel.create({
      ...createUserDto,
      roles: [role._id],
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }
}
