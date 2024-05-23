import { Exclude, Expose } from "class-transformer";
import { UUID } from "crypto";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Interaction } from "./interaction.entity";
import { User } from "./user.entity";

@Entity("posts")
export class Post {
	@PrimaryGeneratedColumn("uuid")
	id: UUID;

	@Column({ nullable: false, type: "varchar", length: 50 })
	title: string;

	@Column({ nullable: false, type: "varchar" })
	content: string;

	// this one entity has the foreing key
	@ManyToOne(() => User, (owner) => owner.posts, { nullable: false })
	owner: User;

	@Exclude()
	@OneToMany(() => Interaction, (interaction) => interaction.post, {
		nullable: true,
	})
	interactions: Interaction[];

	@CreateDateColumn({
		nullable: false,
		type: "timestamp with time zone",
		name: "created_at",
	})
	createdAt: Date;

	@UpdateDateColumn({
		nullable: false,
		type: "timestamp with time zone",
		name: "updated_at",
	})
	updatedAt: Date;

	@Exclude()
	@DeleteDateColumn({
		default: null,
		name: "deleted_at",
	})
	deletedAt?: Date;

	@Expose()
	get likes() {
		if (this.interactions) {
			return this.interactions
				.filter((interaction) => !!interaction)
				.map((interaction) => ({
					id: interaction.id,
					fullName: interaction.user.fullName,
					userId: interaction.user.id,
				}));
		}
		return [];
	}
}
