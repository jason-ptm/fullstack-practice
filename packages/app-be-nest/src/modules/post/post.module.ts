import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Interaction } from "src/entities/interaction.entity";
import { Post } from "src/entities/post.entity";
import { InteractionService } from "./interaction.service";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
	imports: [TypeOrmModule.forFeature([Post, Interaction])],
	controllers: [PostController],
	providers: [PostService, InteractionService],
})
export class PostModule {}
