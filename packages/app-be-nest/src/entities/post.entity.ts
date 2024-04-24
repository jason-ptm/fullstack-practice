import { UUID } from "crypto";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("posts")
export class Post {
	@PrimaryGeneratedColumn("uuid")
	id: UUID;

	@Column({ nullable: false, type: "varchar", length: 50 })
	title: string;

	@Column({ nullable: false, type: "varchar" })
	content: string;

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
