import { Permission } from "../../permission/entities/permission.entity";

export class CreateRoleDto {
  readonly _id?: string;
  readonly title: string;
  readonly permissions: Permission[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
