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

	async searchByPostAndUser(postId: UUID, userId: UUID) {
		const interaction = await this.interactionRepository.findOne({
			where: {
				post: {
					id: postId,
				},
				user: {
					id: userId,
				},
			},
		});
		return interaction;
	}

	async interact(postId: UUID, userId: UUID) {
		const checkInteraction = await this.searchByPostAndUser(postId, userId);
		if (!checkInteraction) {
			const post = await this.postService.findOne(postId);
			const user = await this.userService.findOne(userId);

			const interaction = this.interactionRepository.create({
				post,
				user,
			});
			await this.interactionRepository.insert(interaction);

			return {
				id: interaction.id,
				fullName: user.fullName,
				userId: user.id,
			};
		} else {
			await this.interactionRepository.delete(
				checkInteraction.id,
			);

			return {
				id: checkInteraction.id,
			};
		}
	}
}
