import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "src/entities/auth.entity";
import { User } from "src/entities/user.entity";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, Auth])],
	controllers: [UserController, AuthController],
	providers: [UserService, AuthService],
	exports: [UserService, AuthService],
})
export class UserModule {}
