import { createSlice } from '@reduxjs/toolkit';
import type { Comment } from '../../types';
import { mockComments } from '../../data/mockData';

interface CommentsState {
  items: Record<string, Comment>;
}

const initialState: CommentsState = {
  items: mockComments.reduce<Record<string, Comment>>((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {}),
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: { payload: Comment }) {
      state.items[action.payload.id] = action.payload;
    },
    updateComment(state, action: { payload: Comment }) {
      if (state.items[action.payload.id]) {
        state.items[action.payload.id] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    removeComment(state, action: { payload: string }) {
      delete state.items[action.payload];
    },
    likeComment(state, action: { payload: { commentId: string; username: string } }) {
      const comment = state.items[action.payload.commentId];
      if (comment && !comment.likeUsernames.includes(action.payload.username)) {
        comment.likeUsernames.push(action.payload.username);
      }
    },
    unlikeComment(state, action: { payload: { commentId: string; username: string } }) {
      const comment = state.items[action.payload.commentId];
      if (comment) {
        comment.likeUsernames = comment.likeUsernames.filter(
          (u) => u !== action.payload.username
        );
      }
    },
    setComments(state, action: { payload: Comment[] }) {
      state.items = action.payload.reduce<Record<string, Comment>>((acc, c) => {
        acc[c.id] = c;
        return acc;
      }, {});
    },
  },
});

export const {
  addComment,
  updateComment,
  removeComment,
  likeComment,
  unlikeComment,
  setComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;
