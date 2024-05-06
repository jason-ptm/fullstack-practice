import {
	Body,
	Controller,
	Delete,
	Patch,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Public } from "src/decorators/public.decorator";
import { Auth } from "src/entities/auth.entity";
import { PayloadToken } from "src/models/token.model";
import { AuthService } from "./auth.service";
import { CreateAuthDto, UpdateEmailDto, UpdatePasswordDto } from "./dto/auth.dto";
import { AuthorizationGuard } from "./guards/auth/authorization.guard";

@UseGuards(AuthorizationGuard)
@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@UseGuards(AuthGuard("local"))
	@Post("/login")
	login(@Req() req: Request) {
		return this.authService.generateJwt(req.user as Auth);
	}

	@Public()
	@Post("/register")
	async register(@Body() user: CreateAuthDto) {
		try {
			return await this.authService.register(user);
		} catch (error) {
			return error;
		}
	}

	@Patch("/my-profile/email")
	async updateEmail(@Body() updateData: UpdateEmailDto, @Req() req: Request) {
		try {
			const { sub } = req.user as PayloadToken;
			return await this.authService.updateEmail(updateData, sub.account);
		} catch (error) {
			return error;
		}
	}

	@Patch("/my-profile/password")
	async updatePassword(
		@Body() updateData: UpdatePasswordDto,
		@Req() req: Request,
	) {
		try {
			const { sub } = req.user as PayloadToken;
			return await this.authService.updatePassword(updateData, sub.account);
		} catch (error) {
			return error;
		}
	}

	@Delete("/my-profile")
	async delete(@Req() req: Request) {
		try {
			const { sub } = req.user as PayloadToken;
			return await this.authService.delete(sub.account);
		} catch (error) {
			return error;
		}
	}
}
