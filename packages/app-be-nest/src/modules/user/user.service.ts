import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	async findAll() {
		return await this.userRepository.find();
	}

	async findOne(id: UUID) {
		const user = await this.userRepository.findOneBy({
			id,
		});

		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	async create(user: CreateUserDto) {
		const createdUser = this.userRepository.create(user);
		await this.userRepository.insert(createdUser);
		return user;
	}

	async update(data: UpdateUserDto, id: UUID) {
		await this.findOne(id);
		await this.userRepository.update(id, data);
		return data;
	}
}
