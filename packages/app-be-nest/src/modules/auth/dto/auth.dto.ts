import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsEmail,
	IsNotEmpty,
	IsNotEmptyObject,
	IsObject,
	IsUUID,
	MaxLength,
} from "class-validator";
import { UUID } from "crypto";
import { CreateUserDto } from "src/modules/user/dtos/user.dto";

export class CreateAuthDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	// @IsStrongPassword()
	@MaxLength(30)
	@ApiProperty()
	password: string;

	@IsNotEmpty()
	@IsObject()
	@IsNotEmptyObject()
	@Type(() => CreateUserDto)
	@ApiProperty()
	user: CreateUserDto;
}

export class LocalAuthDto extends PartialType(
	OmitType(CreateAuthDto, ["user"]),
) {}

export class UpdateEmailDto extends PartialType(
	PickType(CreateAuthDto, ["email"]),
) {}

export class UpdatePasswordDto extends PartialType(
	PickType(CreateAuthDto, ["password"]),
) {}
