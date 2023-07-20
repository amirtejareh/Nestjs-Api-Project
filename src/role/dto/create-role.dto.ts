import { Permission } from "../../permission/entities/permission.entity";

export class CreateRoleDto {
  readonly _id?: string;
  readonly title: string;
  readonly permission: Permission[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
