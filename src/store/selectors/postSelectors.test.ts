import { describe, it, expect } from 'vitest';
import {
  selectAllPosts,
  selectSortedPosts,
  selectPostsByUsername,
} from './postSelectors';
import type { RootState } from '../index';

const mockState: RootState = {
  users: { items: {} },
  auth: { isAuthenticated: false, currentUsername: null, loading: false, error: null },
  posts: {
    items: {
      p1: {
        id: 'p1',
        authorUsername: 'alice',
        content: 'First post',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z',
        likeUsernames: ['bob'],
        shareCount: 0,
        isShared: false,
        sharedFromPostId: null,
        sharedByUsername: null,
        commentIds: ['c1'],
      },
      p2: {
        id: 'p2',
        authorUsername: 'bob',
        content: 'Second post',
        createdAt: '2024-01-02T10:00:00Z',
        updatedAt: '2024-01-02T10:00:00Z',
        likeUsernames: [],
        shareCount: 2,
        isShared: false,
        sharedFromPostId: null,
        sharedByUsername: null,
        commentIds: [],
      },
    },
  },
  comments: { items: {} },
  theme: 'light',
  toast: { items: [] },
} as unknown as RootState;

describe('postSelectors', () => {
  it('selectAllPosts returns all posts', () => {
    const posts = selectAllPosts(mockState);
    expect(posts).toHaveLength(2);
  });

  it('selectSortedPosts sorts by newest', () => {
    const posts = selectSortedPosts(mockState, 'newest');
    expect(posts[0].id).toBe('p2');
    expect(posts[1].id).toBe('p1');
  });

  it('selectSortedPosts sorts by most shared', () => {
    const posts = selectSortedPosts(mockState, 'mostShared');
    expect(posts[0].shareCount).toBe(2);
  });

  it('selectSortedPosts filters by keyword', () => {
    const posts = selectSortedPosts(mockState, 'newest', 'Second');
    expect(posts).toHaveLength(1);
    expect(posts[0].content).toBe('Second post');
  });

  it('selectPostsByUsername filters by author', () => {
    const posts = selectPostsByUsername(mockState, 'alice');
    expect(posts).toHaveLength(1);
    expect(posts[0].authorUsername).toBe('alice');
  });
});
