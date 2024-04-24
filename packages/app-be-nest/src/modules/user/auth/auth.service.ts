import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { UUID } from "crypto";
import { Auth } from "src/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateAuthDto, UpdateAuthDto } from "../dtos/auth.dto";

interface UpdateAuth {
	id?: UUID;
	email?: string;
}

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Auth) private authRepository: Repository<Auth>,
	) {}

	async findOne(data: UpdateAuth) {
		const user = await this.authRepository.findOneBy(data);
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	async login(data: CreateAuthDto) {
		const user = await this.findOne({ email: data.email });
		const isSamePassword = await bcrypt.compare(
			data.password,
			user.password,
		);
		if (!isSamePassword) throw new BadRequestException();
		return user;
	}

	async update(data: UpdateAuthDto, id: UUID) {
		await this.findOne({ id });
		await this.authRepository.update(id, data);
		return data;
	}

	async delete(id: UUID) {
		await this.findOne({ id });
		await this.authRepository.softDelete(id);
		return id;
	}
}
