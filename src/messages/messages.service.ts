import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepository: MessageRepository) {}

  create(createMessageDto: CreateMessageDto) {
    this.messageRepository.create(createMessageDto);
    return `This action create  messages`;
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
