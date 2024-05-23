export type OwnerPost = {
  fullName: string;
  id: string;
};

export type UserInteractionWithPost = {
  fullName: string;
  userId: string;
  id: string;
};

export type UserInteractionReceptionWithPost = {
  fullName?: string;
  userId?: string;
  id: string;
};

export type PostSchema = {
  id: string;
  title: string;
  content: string;
  likes: UserInteractionWithPost[];
  owner: OwnerPost;
  createdAt: string;
  updatedAt: string;
};

export type InteractionSchema = {
  liked: boolean;
  data: UserInteractionReceptionWithPost;
  postId: string;
};
