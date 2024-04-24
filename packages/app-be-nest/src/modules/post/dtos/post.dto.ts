import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	@ApiProperty()
	title: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@ApiProperty()
	content: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
