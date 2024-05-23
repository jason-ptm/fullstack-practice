import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { Request } from "express";
import { PayloadToken } from "src/models/token.model";
import { UpdateUserDto } from "./dtos/user.dto";
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
			return await this.userService.findOneWithAccount(id);
		} catch (error) {
			return error;
		}
	}

	@Patch()
	async update(@Body() user: UpdateUserDto, @Req() req: Request) {
		try {
			const { sub } = req.user as PayloadToken;
			return await this.userService.update(user, sub.user);
		} catch (error) {
			return error;
		}
	}
}
