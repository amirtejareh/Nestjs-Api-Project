// message.dto.ts
export class CreateMessageDto {
  readonly content: string;
  readonly sender?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
