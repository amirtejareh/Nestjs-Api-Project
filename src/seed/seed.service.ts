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
      { resource: "post", action: "create" },
      { resource: "post", action: "read" },
      { resource: "post", action: "update" },
      { resource: "post", action: "delete" },
      { resource: "course", action: "read" },
      { resource: "profile", action: "read" },
      { resource: "profile", action: "update" },
    ];

    const roles = [
      {
        title: "SuperAdmin",
        permissions: permissions.map((permission) => permission),
      },
      { title: "User", permissions: [{ resource: "profile", action: "read" }] },
    ];

    for (const permission of permissions) {
      const existingPermission = await this.permissionModel.findOne({
        resource: permission.resource,
        action: permission.action,
      });

      if (!existingPermission) {
        await this.permissionModel.create(permission);
        console.log(
          `Permission ${permission.resource}:${permission.action} created`
        );
      }
    }

    for (const role of roles) {
      const permissionObjects = await this.permissionModel
        .find({
          resource: { $in: role.permissions.map((p) => p.resource) },
          action: { $in: role.permissions.map((p) => p.action) },
        })
        .exec();
      const permissionIds = permissionObjects.map(
        (permission) => permission._id
      );

      const existingRole = await this.roleModel.findOne({ title: role.title });

      if (existingRole) {
        existingRole.permissions = permissionIds;
        await existingRole.save();
        console.log(
          `Role ${role.title} updated with permissions ${role.permissions.map(
            (p) => p.resource + ":" + p.action
          )}`
        );
      } else {
        const createdRole = await this.roleModel.create({
          title: role.title,
          permissions: permissionIds,
        });
        console.log(
          `Role ${role.title} created with permissions ${role.permissions.map(
            (p) => p.resource + ":" + p.action
          )}`
        );
      }
    }

    console.log("Database seeded");
  }
}
