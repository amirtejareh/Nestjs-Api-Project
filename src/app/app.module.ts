import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { MessagesModule } from "../messages/messages.module";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/karanbala"),
    MessagesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
