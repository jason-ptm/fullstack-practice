import { UUID } from "crypto";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity("interactions")
export class Interaction {
	@PrimaryGeneratedColumn("uuid")
	id: UUID;

	@ManyToOne(() => Post, (post) => post.interactions, { nullable: false })
	post: Post;

	@ManyToOne(() => User, (user) => user.interactions, { nullable: false })
	user: User;
}
