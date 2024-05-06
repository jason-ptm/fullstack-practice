import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { UUID } from "crypto";
import { Auth } from "src/entities/auth.entity";
import { User } from "src/entities/user.entity";
import { PayloadToken } from "src/models/token.model";
import { Repository } from "typeorm";
import {
	CreateAuthDto,
	LocalAuthDto,
	UpdateEmailDto,
	UpdatePasswordDto,
} from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Auth) private authRepository: Repository<Auth>,
		@InjectRepository(User) private userRepository: Repository<User>,
		private jwtService: JwtService,
	) {}

	async register(data: CreateAuthDto) {
		const password = await bcrypt.hash(data.password, 10);
		const account = {
			...data,
			password,
		};
		const user = this.userRepository.create(data.user);
		const newAccount = this.authRepository.create(account);
		await this.userRepository.insert(user);
		newAccount.user = user;
		await this.authRepository.insert(newAccount);
		return await this.generateJwt(newAccount);
	}

	async findOneById(id: UUID) {
		const account = await this.authRepository.findOneBy({ id });
		if (!account) throw new UnauthorizedException();
		return account;
	}

	async validateUser(data: LocalAuthDto) {
		const account = await this.authRepository.findOne({
			where: {
				email: data.email,
			},
			relations: ["user"],
		});
		if (!account) throw new BadRequestException();
		const isSamePassword = await bcrypt.compare(
			data.password,
			account.password,
		);
		if (!isSamePassword) throw new BadRequestException();
		return account;
	}

	async updateEmail(data: UpdateEmailDto, id: UUID) {
		await this.findOneById(id);
		await this.authRepository.update(id, data);
		return data;
	}

	async updatePassword(data: UpdatePasswordDto, id: UUID) {
		const account = await this.findOneById(id);
		const isSamePassword = await bcrypt.compare(
			data.password,
			account.password,
		);
		if (isSamePassword) throw new BadRequestException();
		const password = await bcrypt.hash(data.password, 10);
		await this.authRepository.update(id, { password });
		return data;
	}

	async delete(id: UUID) {
		await this.findOneById(id);
		await this.authRepository.softDelete(id);
		return true;
	}

	async generateJwt(account: Auth) {
		const payload: PayloadToken = {
			sub: {
				account: account.id,
				user: account.user.id,
			},
		};
		return {
			access_token: this.jwtService.sign(payload),
			account,
		};
	}
}
