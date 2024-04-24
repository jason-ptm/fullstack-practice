import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Post } from "src/entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostDto, UpdatePostDto } from "./dtos/post.dto";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post) private postRepository: Repository<Post>,
	) {}

	async findAll() {
		return await this.postRepository.find();
	}

	async findOne(id: UUID) {
		const post = await this.postRepository.findBy({ id });
		if (!post) throw new NotFoundException();
		return post;
	}

	async update(data: UpdatePostDto, id: UUID) {
		await this.findOne(id);
		await this.postRepository.update(id, data);
		return data;
	}

	async create(data: CreatePostDto) {
		const post = this.postRepository.create(data);
		await this.postRepository.insert(post);
		return post;
	}

	async delete(id: UUID) {
		await this.findOne(id);
		this.postRepository.softDelete(id);
		return id;
	}
}
