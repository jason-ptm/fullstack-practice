import { UUID } from "crypto";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

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
		default: () => "CURRENT_TIMESTAMP",
		nullable: false,
		name: "created_at",
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
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

	@OneToOne(() => User, (user) => user.account, {
		nullable: false,
	})
	user: User;
}
