import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role, RoleDocument } from "../role/entities/role.entity";
import {
  Permission,
  PermissionDocument,
} from "../permission/entities/permission.entity";
import { Model } from "mongoose";

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>
  ) {}

  async seed() {
    const permissions = [
      { title: "article" },
      { title: "course" },
      { title: "profile" },
      { title: "episode" },
    ];
    const roles = [
      {
        name: "Super admin",
        permissions: permissions.map((permission) => permission.title),
      },
      { name: "User", permissions: ["profile"] },
    ];

    for (const permission of permissions) {
      const existingPermission = await this.permissionModel.findOne({
        title: permission.title,
      });

      if (!existingPermission) {
        await this.permissionModel.create(permission);
        console.log(`Permission ${permission.title} created`);
      }
    }

    for (const role of roles) {
      const permissionObjects = await this.permissionModel
        .find({ title: { $in: role.permissions } })
        .exec();
      const permissionIds = permissionObjects.map(
        (permission) => permission._id
      );

      const existingRole = await this.roleModel.findOne({ title: role.name });

      if (existingRole) {
        existingRole.permission = permissionIds;
        await existingRole.save();
        console.log(
          `Role ${role.name} updated with permissions ${role.permissions}`
        );
      } else {
        const createdRole = await this.roleModel.create({
          title: role.name,
          permission: permissionIds,
        });
        console.log(
          `Role ${role.name} created with permissions ${role.permissions}`
        );
      }
    }

    console.log("Database seeded");
  }
}
