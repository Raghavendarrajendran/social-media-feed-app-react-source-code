import type { User, Post, Comment } from '../types';

// Simple hash for mock - in production use proper server-side hashing
function mockHash(password: string): string {
  return `hash_${btoa(encodeURIComponent(password))}`;
}

export const mockUsers: User[] = [
  {
    id: 'u_admin',
    name: 'Administrator',
    username: 'admin',
    passwordHash: mockHash('admin@123'),
    createdAt: '2024-01-01T00:00:00Z',
    isAdmin: true,
  },
  {
    id: 'u1',
    name: 'Alice Johnson',
    username: 'alice',
    passwordHash: mockHash('password123'),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'u2',
    name: 'Bob Smith',
    username: 'bob',
    passwordHash: mockHash('password123'),
    createdAt: '2024-01-02T00:00:00Z',
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    authorUsername: 'alice',
    content: 'Hello world! My first post.',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    likeUsernames: ['bob'],
    shareCount: 1,
    isShared: false,
    sharedFromPostId: null,
    sharedByUsername: null,
    commentIds: ['c1'],
  },
  {
    id: 'p2',
    authorUsername: 'bob',
    content: 'React and Redux are awesome!',
    createdAt: '2024-01-11T12:00:00Z',
    updatedAt: '2024-01-11T12:00:00Z',
    likeUsernames: ['alice'],
    shareCount: 0,
    isShared: false,
    sharedFromPostId: null,
    sharedByUsername: null,
    commentIds: ['c2'],
  },
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    authorUsername: 'bob',
    content: 'Great post!',
    createdAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-01-10T11:00:00Z',
    likeUsernames: [],
  },
  {
    id: 'c2',
    postId: 'p2',
    authorUsername: 'alice',
    content: 'I agree!',
    createdAt: '2024-01-11T13:00:00Z',
    updatedAt: '2024-01-11T13:00:00Z',
    likeUsernames: [],
  },
];
