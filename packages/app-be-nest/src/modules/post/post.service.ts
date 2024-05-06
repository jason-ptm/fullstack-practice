import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Post } from "src/entities/post.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { CreatePostDto, UpdatePostDto } from "./dtos/post.dto";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post) private postRepository: Repository<Post>,
		private userService: UserService,
	) {}

	async create(data: CreatePostDto, userId: UUID) {
		const owner = await this.userService.findOne(userId);
		const postData = {
			content: data.content,
			title: data.title,
			owner,
		};
		const postCreated = this.postRepository.create(postData);
		await this.postRepository.insert(postCreated);
		return postCreated;
	}

	async findAll() {
		return await this.postRepository.find({
			relations: ["owner", "interactions", "interactions.user"],
			select: {
				owner: {
					id: true,
					fullName: true,
				},
				interactions: {
					id: true,
					user: {
						fullName: true,
					},
				},
			},
		});
	}

	async findOne(id: UUID) {
		const post = await this.postRepository.findOne({
			where: { id },
			relations: ["owner"],
		});
		if (!post) throw new NotFoundException();
		return post;
	}

	async update(data: UpdatePostDto, id: UUID, userId: UUID) {
		const post = await this.findOne(id);
		if (post.owner.id !== userId) throw new UnauthorizedException();
		await this.postRepository.update(id, data);
		return data;
	}

	async delete(id: UUID, userId: UUID) {
		const post = await this.findOne(id);
		if (post.owner.id !== userId) throw new UnauthorizedException();
		this.postRepository.softDelete(id);
		return { id };
	}
}
