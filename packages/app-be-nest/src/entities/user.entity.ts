import { UUID } from "crypto";
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Auth } from "./auth.entity";
import { Interaction } from "./interaction.entity";
import { Post } from "./post.entity";

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

	@OneToMany(() => Post, (post) => post.owner, { nullable: true })
	posts: Post[];

	@OneToMany(() => Interaction, (interaction) => interaction.user, {
		nullable: true,
	})
	interactions: Interaction[];

	// one to one relation, the one who have the joinColumn have the relation in the dabatabase
	@OneToOne(() => Auth, (auth) => auth.user)
	@JoinColumn()
	account: Auth;
}
