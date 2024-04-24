import { UUID } from "crypto";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("accounts")
export class Auth {
	@PrimaryGeneratedColumn("uuid")
	id: UUID;

	@Column({ unique: true, nullable: false, type: "varchar", length: 40 })
	email: string;

	@Column({ nullable: false, type: "varchar" })
	password: string;

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		nullable: false,
		name: "created_at",
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
		nullable: false,
		name: "updated_at",
	})
	updatedAt: Date;

	@DeleteDateColumn({
		type: "timestamp",
		default: null,
		name: "deleted_at",
	})
	deletedAt?: Date;
}
