import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
	IsEmail,
	IsNotEmpty,
	IsStrongPassword,
	MaxLength,
} from "class-validator";

export class CreateAuthDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@IsStrongPassword()
	@MaxLength(30)
	@ApiProperty()
	password: string;
}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
