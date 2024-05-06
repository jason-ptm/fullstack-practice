import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Max,
} from "class-validator";

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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
