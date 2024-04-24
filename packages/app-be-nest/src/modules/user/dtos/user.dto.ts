import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsNotEmpty,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsPositive,
	IsString,
	Max,
} from "class-validator";
import { CreateAuthDto } from "./auth.dto";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	fullName: string;

	@IsNotEmpty()
	@IsPositive()
	@IsNumber()
	@Max(150)
	@ApiProperty()
	age: number;

	@IsNotEmpty()
	@IsObject()
	@IsNotEmptyObject()
	@Type(() => CreateAuthDto)
	@ApiProperty()
	account: CreateAuthDto;
}

export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ["account"]),
) {}
