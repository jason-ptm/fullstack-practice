import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Interaction } from "src/entities/interaction.entity";
import { Repository } from "typeorm";
import { InteractionDto } from "./dtos/interaction.dto";

@Injectable()
export class InteractionService {
	constructor(
		@InjectRepository(Interaction)
		private interactionRepository: Repository<Interaction>,
	) {}

	async findOneByPost(data: InteractionDto) {
		return await this.interactionRepository.findOneBy(data);
	}

	async create(data: InteractionDto) {
		const interaction = this.interactionRepository.create(data);
		await this.interactionRepository.insert(interaction);
		return interaction;
	}

	async delete(data: InteractionDto) {
		await this.interactionRepository.delete(data);
		return data;
	}

	async react(data: InteractionDto) {
		const interaction = await this.findOneByPost(data);

		if (interaction) return this.delete(data);
		return this.create(data);
	}
}
