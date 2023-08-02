import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Home")
@Controller()
export class AppController {
  @Get()
  mainRoute() {
    return "nest js started";
  }
}
