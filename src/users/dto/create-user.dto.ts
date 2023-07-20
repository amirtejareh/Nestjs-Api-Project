export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly roles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
