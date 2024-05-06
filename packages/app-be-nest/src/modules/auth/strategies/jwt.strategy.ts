import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "src/config/config";
import { PayloadToken } from "src/models/token.model";
import tokenSchema from "./token.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		@Inject(config.KEY) private configService: ConfigType<typeof config>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.jwtSecret,
		});
	}

	validate(payload: PayloadToken) {
		const validation = tokenSchema.validate(payload.sub);
		if (!!validation.error)
			throw new UnauthorizedException("Invalid token");
		return payload;
	}
}
