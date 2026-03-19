import { describe, it, expect } from 'vitest';
import postsReducer, {
  addPost,
  likePost,
  unlikePost,
  sharePost,
  updatePost,
  removePost,
} from './postsSlice';

const basePost = {
  id: 'p1',
  authorUsername: 'alice',
  content: 'Hello',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  likeUsernames: [] as string[],
  shareCount: 0,
  isShared: false,
  sharedFromPostId: null,
  sharedByUsername: null,
  commentIds: [] as string[],
};

describe('postsSlice', () => {
  it('adds a post', () => {
    const state = postsReducer(
      { items: {} },
      addPost({ ...basePost, id: 'p_new' })
    );
    expect(state.items['p_new']).toBeDefined();
    expect(state.items['p_new'].content).toBe('Hello');
  });

  it('likes a post', () => {
    const state = postsReducer(
      { items: { p1: { ...basePost } } },
      likePost({ postId: 'p1', username: 'bob' })
    );
    expect(state.items['p1'].likeUsernames).toContain('bob');
  });

  it('unlikes a post', () => {
    const state = postsReducer(
      { items: { p1: { ...basePost, likeUsernames: ['bob'] } } },
      unlikePost({ postId: 'p1', username: 'bob' })
    );
    expect(state.items['p1'].likeUsernames).not.toContain('bob');
  });

  it('increments share count', () => {
    const state = postsReducer(
      { items: { p1: basePost } },
      sharePost({ postId: 'p1', username: 'bob' })
    );
    expect(state.items['p1'].shareCount).toBe(1);
  });

  it('updates a post', () => {
    const state = postsReducer(
      { items: { p1: basePost } },
      updatePost({ ...basePost, content: 'Updated' })
    );
    expect(state.items['p1'].content).toBe('Updated');
  });

  it('removes a post', () => {
    const state = postsReducer(
      { items: { p1: basePost } },
      removePost('p1')
    );
    expect(state.items['p1']).toBeUndefined();
  });
});
