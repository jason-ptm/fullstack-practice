import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { InteractionDto } from "./dtos/interaction.dto";
import { CreatePostDto, UpdatePostDto } from "./dtos/post.dto";
import { InteractionService } from "./interaction.service";
import { PostService } from "./post.service";

@ApiTags("post")
@Controller("post")
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly interactionService: InteractionService,
	) {}

	@ApiTags()
	@Get()
	async getAll() {
		try {
			return await this.postService.findAll();
		} catch (error) {
			return error;
		}
	}

	@ApiTags()
	@Get("/:id")
	async getOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID) {
		try {
			return await this.postService.findOne(id);
		} catch (error) {
			return error;
		}
	}

	@ApiTags()
	@Post()
	async create(@Body() data: CreatePostDto) {
		try {
			return await this.postService.create(data);
		} catch (error) {
			return error;
		}
	}

	@ApiTags()
	@Post("/interact")
	async interact(@Body() data: InteractionDto) {
		try {
			return await this.interactionService.react(data);
		} catch (error) {
			return error;
		}
	}

	@ApiTags()
	@Patch("/:id")
	async update(
		@Body() data: UpdatePostDto,
		@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID,
	) {
		try {
			return await this.postService.update(data, id);
		} catch (error) {
			return error;
		}
	}

	@ApiTags()
	@Delete("/:id")
	async delete(@Param("id", new ParseUUIDPipe({ version: "4" })) id: UUID) {
		try {
			return await this.postService.delete(id);
		} catch (error) {
			return error;
		}
	}
}
