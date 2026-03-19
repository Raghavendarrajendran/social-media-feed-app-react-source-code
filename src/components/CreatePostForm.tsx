import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useToast } from '../hooks/useToast';
import { addPost } from '../store/slices/postsSlice';
import { sanitizeHtml } from '../utils/sanitizeHtml';
import { extractHashtags, extractMentions } from '../utils/parseContent';
import type { Post, MediaItem } from '../types';
import { RichTextEditor } from './RichTextEditor';
import { MediaPicker } from './MediaPicker';

export function CreatePostForm() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const currentUsername = useAppSelector((s) => s.auth.currentUsername);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUsername) return;
    const trimmed = content.replace(/<p><\/p>/g, '').trim();
    if ((!trimmed || trimmed === '<p></p>') && media.length === 0) return;
    const sanitized = trimmed ? sanitizeHtml(trimmed).slice(0, 15000) : '';
    const textContent = sanitized.replace(/<[^>]*>/g, ' ');
    const post: Post = {
      id: `p_${Date.now()}`,
      authorUsername: currentUsername,
      content: sanitized || '(No text)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeUsernames: [],
      shareCount: 0,
      isShared: false,
      sharedFromPostId: null,
      sharedByUsername: null,
      commentIds: [],
      mediaUrls: media.length > 0 ? media : undefined,
      hashtags: extractHashtags(textContent).length > 0 ? extractHashtags(textContent) : undefined,
      mentions: extractMentions(textContent).length > 0 ? extractMentions(textContent) : undefined,
      location: location.trim() || undefined,
    };
    dispatch(addPost(post));
    setContent('');
    setMedia([]);
    setLocation('');
    toast.success('Post created!');
  };

  const textLength = content.replace(/<[^>]*>/g, '').length;
  const isEmpty =
    (!content.trim() || content === '<p></p>') && media.length === 0;

  if (!currentUsername) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="new-post" className="sr-only">
        Create a new post
      </label>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="What's on your mind? Use #hashtag and @mention"
        maxLength={5000}
        minHeight="140px"
      />
      <div className="mt-2">
        <label htmlFor="post-location" className="block text-sm text-[var(--text-secondary)] mb-1">
          Location (optional)
        </label>
        <input
          id="post-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Add location..."
          className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] text-sm"
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm text-[var(--text-secondary)] mb-1">
          Images / Videos (optional)
        </label>
        <MediaPicker media={media} onChange={setMedia} />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-[var(--text-secondary)]">
          {textLength}/5000
        </span>
        <button
          type="submit"
          disabled={isEmpty}
          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Post
        </button>
      </div>
    </form>
  );
}
