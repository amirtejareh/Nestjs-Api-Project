import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./entities/role.entity";

@Injectable()
export class RoleRepository {
  constructor(@InjectModel("role") private readonly roleModel: Model<Role>) {}

  async findOneByTitle(title: string): Promise<Role | undefined> {
    return this.roleModel.findOne({ title }).exec();
  }
}
