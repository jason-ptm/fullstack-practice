import { PostSchema } from '../post.entity';

export type DeletePostDto = Pick<PostSchema, 'id'>;
