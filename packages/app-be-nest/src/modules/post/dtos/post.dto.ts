import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { UUID } from "crypto";

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

	// temporal while token implementation
	@IsNotEmpty()
	@IsUUID("4")
	@ApiProperty()
	ownerId: UUID;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
