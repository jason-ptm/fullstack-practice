import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: UUID;

	@Column({
		type: "varchar",
		length: 255,
		nullable: false,
		name: "full_name",
	})
	fullName: string;

	@Column({ type: "integer", nullable: false })
	age: number;
}
