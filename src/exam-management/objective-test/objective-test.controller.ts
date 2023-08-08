import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ObjectiveTestService } from "./objective-test.service";
import { CreateObjectiveTestDto } from "./dto/create-objective-test.dto";
import { UpdateObjectiveTestDto } from "./dto/update-objective-test.dto";

@Controller("objectiveTest")
export class ObjectiveTestController {
  constructor(private readonly objectiveTestService: ObjectiveTestService) {}

  @Post()
  create(@Body() createObjectiveTestDto: CreateObjectiveTestDto) {
    return this.objectiveTestService.create(createObjectiveTestDto);
  }

  @Get()
  findAll() {
    return this.objectiveTestService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.objectiveTestService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateObjectiveTestDto: UpdateObjectiveTestDto
  ) {
    return this.objectiveTestService.update(+id, updateObjectiveTestDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.objectiveTestService.remove(+id);
  }
}
