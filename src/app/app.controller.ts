import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  mainRoute() {
    return "nest js started";
  }
}
