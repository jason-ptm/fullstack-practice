import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Interaction } from "src/entities/interaction.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { PostService } from "./post.service";

@Injectable()
export class InteractionService {
	constructor(
		@InjectRepository(Interaction)
		private interactionRepository: Repository<Interaction>,
		private postService: PostService,
		private userService: UserService,
	) {}

	async create(postId: UUID, userId: UUID) {
		const post = await this.postService.findOne(postId);
		const user = await this.userService.findOne(userId);

		const interaction = this.interactionRepository.create({ post, user });
		await this.interactionRepository.insert(interaction);
		return { liked: true };
	}

	async delete(id: UUID) {
		await this.interactionRepository.delete(id);
		return { liked: false };
	}
}
