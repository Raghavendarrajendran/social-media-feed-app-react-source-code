import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CreatePostForm } from './CreatePostForm';
import authReducer from '../store/slices/authSlice';
import postsReducer from '../store/slices/postsSlice';

// Mock RichTextEditor with a simple textarea for jsdom compatibility (Tiptap uses DOM APIs jsdom lacks)
vi.mock('./RichTextEditor', () => ({
  RichTextEditor: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  }) => (
    <textarea
      data-testid="rich-text-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

function renderWithAuth() {
  const store = configureStore({
    reducer: { auth: authReducer, posts: postsReducer },
    preloadedState: {
      auth: {
        isAuthenticated: true,
        currentUsername: 'alice',
        loading: false,
        error: null,
      },
    },
  });
  return { store, ...render(
    <Provider store={store}>
      <CreatePostForm />
    </Provider>
  ) };
}

describe('CreatePostForm', () => {
  it('creates a post when form is submitted', async () => {
    const user = userEvent.setup();
    const { store } = renderWithAuth();
    const editor = screen.getByTestId('rich-text-editor');
    const submitBtn = screen.getByRole('button', { name: /post/i });

    await user.type(editor, 'My new post!');
    await user.click(submitBtn);

    const posts = Object.values(store.getState().posts.items);
    expect(posts.some((p) => p.content.includes('My new post!'))).toBe(true);
  });

  it('does not render when not authenticated', () => {
    const store = configureStore({
      reducer: { auth: authReducer, posts: postsReducer },
      preloadedState: {
        auth: {
          isAuthenticated: false,
          currentUsername: null,
          loading: false,
          error: null,
        },
      },
    });
    render(
      <Provider store={store}>
        <CreatePostForm />
      </Provider>
    );
    expect(screen.queryByRole('button', { name: /post/i })).not.toBeInTheDocument();
  });
});
