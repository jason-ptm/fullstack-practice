import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "src/config/config";
import { Auth } from "src/entities/auth.entity";
import { User } from "src/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStategy } from "./strategies/local.estrategy";

@Module({
	imports: [
		TypeOrmModule.forFeature([Auth, User]),
		PassportModule,
		JwtModule.registerAsync({
			inject: [config.KEY],
			useFactory: (configService: ConfigType<typeof config>) => ({
				secret: configService.jwtSecret,
				signOptions: {
					expiresIn: "1h",
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStategy, JwtStrategy],
})
export class AuthModule {}
