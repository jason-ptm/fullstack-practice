import {
	Body,
	Controller,
	Delete,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { CreateAuthDto, UpdateAuthDto } from "../dtos/auth.dto";
import { AuthService } from "./auth.service";

@ApiTags("accounts")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/login")
	async login(@Body() loginData: CreateAuthDto) {
		try {
			return await this.authService.login(loginData);
		} catch (error) {
			return error;
		}
	}

	@Patch("/:id")
	async update(
		@Body() updateData: UpdateAuthDto,
		@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID,
	) {
		try {
			return await this.authService.update(updateData, id);
		} catch (error) {
			return error;
		}
	}

	@Delete("/:id")
	async delete(@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID) {
		try {
			return await this.authService.delete(id);
		} catch (error) {
			return error;
		}
	}
}
