import { CreatePostApiDto, CreatePostDto } from './dto/create.dto';
import { PostSchema } from './post.entity';

export const tranformPost = (post: CreatePostDto): CreatePostApiDto => ({
  content: post.content,
  title: post.title,
  user_id: post.userId,
});

export const transformPostFromApi = (posts: any[]): PostSchema[] => {
  return posts.map((post) => ({
    content: post.content,
    id: post.id,
    likes: post.likes,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    title: post.title,
    user: {
      name: post.user_id.full_name,
      id: post.user_id.id,
    },
  }));
};
