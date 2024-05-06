import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy, "local") {
	constructor(private authService: AuthService) {
		super({ usernameField: "email" });
	}

	async validate(email: string, password: string) {
		const user = await this.authService.validateUser({ email, password });
		return user;
	}
}
