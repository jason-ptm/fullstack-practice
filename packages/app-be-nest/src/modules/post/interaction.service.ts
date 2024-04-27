import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Interaction } from "src/entities/interaction.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { InteractionDto } from "./dtos/interaction.dto";
import { PostService } from "./post.service";

@Injectable()
export class InteractionService {
	constructor(
		@InjectRepository(Interaction)
		private interactionRepository: Repository<Interaction>,
		private postService: PostService,
		private userService: UserService,
	) {}

	async findOneByPost(data: InteractionDto) {
		return await this.interactionRepository.findOne({
			relations: ["user", "post"],
			where: {
				user: {
					id: data.userId,
				},
				post: {
					id: data.postId,
				},
			},
		});
	}

	async create(data: InteractionDto) {
		const post = await this.postService.findOne(data.postId);
		const user = await this.userService.findOne(data.userId);

		const interaction = this.interactionRepository.create({ post, user });
		await this.interactionRepository.insert(interaction);
		return { liked: true };
	}

	async delete(id: UUID) {
		await this.interactionRepository.delete(id);
		return { liked: false };
	}

	async react(data: InteractionDto) {
		const interaction = await this.findOneByPost(data);

		if (interaction) return await this.delete(interaction.id);
		return await this.create(data);
	}
}
