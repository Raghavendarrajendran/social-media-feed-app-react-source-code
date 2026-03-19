import type { RootState } from '../index';
import type { Comment } from '../../types';

export function selectCommentsByPostId(
  state: RootState,
  postId: string
): Comment[] {
  const post = state.posts.items[postId];
  if (!post) return [];
  return post.commentIds
    .map((id) => state.comments.items[id])
    .filter(Boolean)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
