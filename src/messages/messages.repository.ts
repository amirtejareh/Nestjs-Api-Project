import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findById(id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }

  async update(id: string, message: Message): Promise<Message> {
    return this.messageModel
      .findByIdAndUpdate(id, message, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Message> {
    return this.messageModel.findByIdAndRemove(id).exec();
  }
}
