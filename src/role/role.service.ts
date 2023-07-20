import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./entities/role.entity";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async findOneByTitle(title: string): Promise<Role | undefined> {
    return this.roleRepository.findOneByTitle(title);
  }

  async findOneById(id: string): Promise<Role | undefined> {
    return this.roleRepository.findOneById(id);
  }
}
