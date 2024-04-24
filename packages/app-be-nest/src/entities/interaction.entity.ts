import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("interactions")
export class Interaction {
	@PrimaryGeneratedColumn("uuid")
	id: UUID;

	@Column({ nullable: false, type: "uuid" })
	postId: UUID;

	@Column({ nullable: false, type: "uuid" })
	userId: UUID;
}
