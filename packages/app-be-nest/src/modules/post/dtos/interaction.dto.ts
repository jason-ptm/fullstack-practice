import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class InteractionDto {
	@IsNotEmpty()
	@IsUUID("4")
	@ApiProperty()
	postId: UUID;

	@IsNotEmpty()
	@IsUUID("4")
	@ApiProperty()
	userId: UUID;
}
