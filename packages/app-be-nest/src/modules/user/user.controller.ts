import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		try {
			return await this.userService.findAll();
		} catch (error) {
			return error;
		}
	}

	@Get("/:id")
	async findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID) {
		try {
			return await this.userService.findOne(id);
		} catch (error) {
			return error;
		}
	}

	@Post()
	async create(@Body() user: CreateUserDto) {
		try {
			return await this.userService.create(user);
		} catch (error) {
			return error;
		}
	}

	@Patch("/:id")
	async update(
		@Body() user: UpdateUserDto,
		@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID,
	) {
		try {
			return await this.userService.update(user, id);
		} catch (error) {
			return error;
		}
	}
}
