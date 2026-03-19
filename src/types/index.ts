export interface User {
  id: string;
  name: string;
  username: string;
  passwordHash: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorUsername: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeUsernames: string[];
}

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

export interface Post {
  id: string;
  authorUsername: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeUsernames: string[];
  shareCount: number;
  isShared: boolean;
  sharedFromPostId: string | null;
  sharedByUsername: string | null;
  commentIds: string[];
  mediaUrls?: MediaItem[];
  hashtags?: string[];
  mentions?: string[];
  location?: string;
}

export type Theme = 'light' | 'dark';

export interface AuthState {
  isAuthenticated: boolean;
  currentUsername: string | null;
  loading: boolean;
  error: string | null;
}
