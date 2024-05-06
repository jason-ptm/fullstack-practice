import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dtos/user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	async findAll() {
		return await this.userRepository.find({
			relations: ["account"],
		});
	}

	async findOne(id: UUID) {
		const user = await this.userRepository.findOne({
			relations: ["account"],
			where: { id },
			select: {
				account: {
					email: true,
				},
			},
		});

		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	async update(data: UpdateUserDto, id: UUID) {
		await this.findOne(id);
		await this.userRepository.update(id, data);
		return data;
	}
}
