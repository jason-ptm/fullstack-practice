import { Injectable, NotFoundException } from "@nestjs/common";
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
		const post = await this.postRepository.findOneBy({ id });
		if (!post) throw new NotFoundException();
		return post;
	}

	async update(data: UpdatePostDto, id: UUID) {
		await this.findOne(id);
		await this.postRepository.update(id, data);
		return data;
	}

	async create(data: CreatePostDto) {
		const owner = await this.userService.findOne(data.ownerId);
		const postData = {
			content: data.content,
			title: data.title,
			owner,
		};
		const postCreated = this.postRepository.create(postData);
		await this.postRepository.insert(postCreated);
		return { id: postCreated.id };
	}

	async delete(id: UUID) {
		await this.findOne(id);
		this.postRepository.softDelete(id);
		return { id };
	}
}
