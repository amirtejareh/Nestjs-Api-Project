import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role, RoleDocument } from "../role/entities/role.entity";
import {
  Permission,
  PermissionDocument,
} from "../permission/entities/permission.entity";
import { Model } from "mongoose";
import { TermOfStudy } from "../content-management/term-of-study/entities/term-of-study.entity";
import { City } from "../city/entities/city.entity";
import { Province } from "../province/entities/province.entity";
import cities from "../common/utils/cities";
import provinces from "../common/utils/privinces";

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    @InjectModel(TermOfStudy.name)
    private termOfStudyModel: Model<TermOfStudy>,
    @InjectModel(City.name)
    private cityModel: Model<City>,
    @InjectModel(Province.name)
    private provinceModel: Model<Province>
  ) {}

  async seed() {
    const existingProvince = await this.provinceModel.find({});

    if (existingProvince.length === 0) {
      await this.provinceModel.create(provinces);
    }

    const existingCity = await this.cityModel.find({});

    if (existingCity.length === 0) {
      await this.cityModel.create(cities);
    }

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

    const existingTermOfStudy = await this.termOfStudyModel.find({});

    if (existingTermOfStudy.length === 0) {
      Array.of(1, 2).map(async (number: number) => {
        await this.termOfStudyModel.create({
          title: `ترم ${number}`,
        });
      });

      this.termOfStudyModel.create({
        title: "کل کتاب",
      });
    }

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
        await this.roleModel.create({
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
