import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }
  async getUser(query: object): Promise<User> {
    return this.userRepository.getUser(query);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
