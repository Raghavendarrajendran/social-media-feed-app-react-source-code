import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Post } from '../../types';

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'mostLiked'
  | 'mostCommented'
  | 'mostShared';

export function selectAllPosts(state: RootState): Post[] {
  return Object.values(state.posts.items);
}

export const selectSortedPosts = createSelector(
  [
    selectAllPosts,
    (_: RootState, sort: SortOption) => sort,
    (_: RootState, _sort: SortOption, keyword?: string) => keyword,
    (_: RootState, _sort: SortOption, _keyword?: string, usernameFilter?: string) =>
      usernameFilter,
  ],
  (posts, sort, keyword, usernameFilter) => {
    let result = [...posts];

    if (usernameFilter) {
      result = result.filter(
        (p) =>
          p.authorUsername.toLowerCase().includes(usernameFilter.toLowerCase()) ||
          (p.sharedByUsername?.toLowerCase().includes(usernameFilter.toLowerCase()) ?? false)
      );
    }

    if (keyword) {
      const k = keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.content.toLowerCase().includes(k) ||
          p.authorUsername.toLowerCase().includes(k)
      );
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'mostLiked':
        result.sort((a, b) => b.likeUsernames.length - a.likeUsernames.length);
        break;
      case 'mostCommented':
        result.sort((a, b) => b.commentIds.length - a.commentIds.length);
        break;
      case 'mostShared':
        result.sort((a, b) => b.shareCount - a.shareCount);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }
);

export function selectPostById(state: RootState, postId: string): Post | undefined {
  return state.posts.items[postId];
}

export function selectPostsByUsername(state: RootState, username: string): Post[] {
  return Object.values(state.posts.items).filter(
    (p) => p.authorUsername === username || p.sharedByUsername === username
  );
}
