import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Post } from "src/entities/post.entity";
import { Like, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { PageDto, PageMetaDto, PageOptionsDto } from "./dtos";
import { CreatePostDto, UpdatePostDto } from "./dtos/post.dto";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post) private postRepository: Repository<Post>,
		private userService: UserService,
	) {}

	async create(data: CreatePostDto, userId: UUID) {
		const owner = await this.userService.findOneWithAccount(userId);
		const postData = {
			content: data.content,
			title: data.title,
			owner,
		};
		const postCreated = this.postRepository.create(postData);
		await this.postRepository.insert(postCreated);
		return postCreated;
	}

	async findAll(pageOptions: PageOptionsDto, userId?: UUID) {
		const filterOptions = {
			where: {},
		};
		if (userId) {
			filterOptions.where = {
				owner: {
					id: userId,
				},
			};
		}

		if (pageOptions.filter) {
			filterOptions.where = [
				{ title: Like(`%${pageOptions.filter}%`) },
				{ content: Like(`%${pageOptions.filter}%`) },
				userId
					? {
							owner: {
								id: userId,
								fullName: Like(`%${pageOptions.filter}%`),
							},
						}
					: {
							owner: {
								fullName: Like(`%${pageOptions.filter}%`),
							},
						},
			];
		}

		const [posts, itemCount] = await this.postRepository.findAndCount({
			relations: ["owner", "interactions", "interactions.user"],
			select: {
				owner: {
					id: true,
					fullName: true,
				},
				interactions: {
					id: true,
					user: {
						id: true,
						fullName: true,
					},
				},
			},
			order: {
				updatedAt: pageOptions.order,
			},
			skip: pageOptions.skip,
			take: pageOptions.take,
			...filterOptions,
		});

		const pageMetaDto = new PageMetaDto({
			itemCount,
			pageOptions,
		});

		return new PageDto(posts, pageMetaDto);
	}

	async findOneWithOwner(id: UUID) {
		const post = await this.postRepository.findOne({
			where: { id },
			relations: ["owner"],
		});
		if (!post) throw new NotFoundException();
		return post;
	}

	async findOne(id: UUID) {
		const post = await this.postRepository.findOne({
			where: { id },
		});
		if (!post) throw new NotFoundException();
		return post;
	}

	async update(data: UpdatePostDto, id: UUID, userId: UUID) {
		const post = await this.findOneWithOwner(id);
		if (post.owner.id !== userId) throw new UnauthorizedException();
		await this.postRepository.update(id, data);
		return data;
	}

	async delete(id: UUID, userId: UUID) {
		const post = await this.findOneWithOwner(id);
		if (post.owner.id !== userId) throw new UnauthorizedException();
		this.postRepository.softDelete(id);
		return post;
	}
}
