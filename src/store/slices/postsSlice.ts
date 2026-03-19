import { createSlice } from '@reduxjs/toolkit';
import type { Post } from '../../types';
import { mockPosts } from '../../data/mockData';

interface PostsState {
  items: Record<string, Post>;
}

const initialState: PostsState = {
  items: mockPosts.reduce<Record<string, Post>>((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {}),
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: { payload: Post }) {
      state.items[action.payload.id] = action.payload;
    },
    updatePost(state, action: { payload: Post }) {
      if (state.items[action.payload.id]) {
        state.items[action.payload.id] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    removePost(state, action: { payload: string }) {
      delete state.items[action.payload];
    },
    likePost(state, action: { payload: { postId: string; username: string } }) {
      const post = state.items[action.payload.postId];
      if (post && !post.likeUsernames.includes(action.payload.username)) {
        post.likeUsernames.push(action.payload.username);
      }
    },
    unlikePost(state, action: { payload: { postId: string; username: string } }) {
      const post = state.items[action.payload.postId];
      if (post) {
        post.likeUsernames = post.likeUsernames.filter(
          (u) => u !== action.payload.username
        );
      }
    },
    sharePost(state, action: { payload: { postId: string; username: string } }) {
      const original = state.items[action.payload.postId];
      if (!original) return;
      original.shareCount += 1;
    },
    addSharedPost(state, action: { payload: Post }) {
      state.items[action.payload.id] = action.payload;
    },
    addCommentToPost(state, action: { payload: { postId: string; commentId: string } }) {
      const post = state.items[action.payload.postId];
      if (post) {
        post.commentIds.push(action.payload.commentId);
      }
    },
    removeCommentFromPost(state, action: { payload: { postId: string; commentId: string } }) {
      const post = state.items[action.payload.postId];
      if (post) {
        post.commentIds = post.commentIds.filter((id) => id !== action.payload.commentId);
      }
    },
    setPosts(state, action: { payload: Post[] }) {
      state.items = action.payload.reduce<Record<string, Post>>((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {});
    },
  },
});

export const {
  addPost,
  updatePost,
  removePost,
  likePost,
  unlikePost,
  sharePost,
  addSharedPost,
  addCommentToPost,
  removeCommentFromPost,
  setPosts,
} = postsSlice.actions;
export default postsSlice.reducer;
