import { Post } from '../schemas/post.schema';

export type UpdatedPostResponse = {
  success: boolean;
  post: Post;
};
