import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useToast } from '../hooks/useToast';
import {
  likePost,
  unlikePost,
  sharePost,
  addSharedPost,
  updatePost,
  removePost,
  removeCommentFromPost,
} from '../store/slices/postsSlice';
import { removeComment } from '../store/slices/commentsSlice';
import { selectCommentsByPostId } from '../store/selectors/commentSelectors';
import { selectPostById } from '../store/selectors/postSelectors';
import type { Post } from '../types';
import { sanitizeText } from '../utils/sanitize';
import { sanitizeHtml, isHtmlContent } from '../utils/sanitizeHtml';
import { CommentList } from './CommentList';
import { ConfirmModal } from './ConfirmModal';
import { RichTextEditor } from './RichTextEditor';
import { MediaCollage } from './MediaCollage';

interface PostCardProps {
  postId: string;
}

export function PostCard({ postId }: PostCardProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const post = useAppSelector((s) => selectPostById(s, postId));
  const comments = useAppSelector((s) => selectCommentsByPostId(s, postId));
  const currentUsername = useAppSelector((s) => s.auth.currentUsername);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!post) return null;

  const isOwner = post.authorUsername === currentUsername || post.sharedByUsername === currentUsername;
  const isLiked = currentUsername && post.likeUsernames.includes(currentUsername);

  const handleLike = () => {
    if (!currentUsername) return;
    if (isLiked) {
      dispatch(unlikePost({ postId: post.id, username: currentUsername }));
    } else {
      dispatch(likePost({ postId: post.id, username: currentUsername }));
    }
  };

  const handleShare = () => {
    if (!currentUsername) return;
    dispatch(sharePost({ postId: post.id, username: currentUsername }));
    const sharedPost: Post = {
      ...post,
      id: `p_shared_${Date.now()}_${post.id}`,
      authorUsername: post.authorUsername,
      content: post.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeUsernames: [],
      shareCount: 0,
      isShared: true,
      sharedFromPostId: post.id,
      sharedByUsername: currentUsername,
      commentIds: [],
      mediaUrls: post.mediaUrls,
      hashtags: post.hashtags,
      mentions: post.mentions,
      location: post.location,
    };
    dispatch(addSharedPost(sharedPost));
  };

  const handleEdit = () => {
    setEditContent(post.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmed = editContent.replace(/<p><\/p>/g, '').trim();
    if (trimmed && trimmed !== '<p></p>') {
      const sanitized = isHtmlContent(editContent)
        ? sanitizeHtml(editContent).slice(0, 10000)
        : sanitizeText(editContent).slice(0, 5000);
      dispatch(
        updatePost({
          ...post,
          content: sanitized,
        })
      );
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    post.commentIds.forEach((cId) => {
      dispatch(removeComment(cId));
      dispatch(removeCommentFromPost({ postId: post.id, commentId: cId }));
    });
    dispatch(removePost(post.id));
    setShowDeleteModal(false);
    toast.success('Post deleted');
  };

  const displayContent = isHtmlContent(post.content)
    ? sanitizeHtml(post.content)
    : sanitizeText(post.content);

  return (
    <article
      className={`rounded-xl border border-[var(--border-color)] p-4 mb-4 bg-[var(--card-bg)] ${
        post.isShared ? 'border-l-4 border-l-[var(--accent)]' : ''
      }`}
      data-testid={`post-${post.id}`}
    >
      {post.isShared && post.sharedByUsername && (
        <p className="text-sm text-[var(--text-secondary)] mb-2">
          Shared by @{post.sharedByUsername}
        </p>
      )}
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <Link
            to={`/profile/${post.authorUsername}`}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            @{post.authorUsername}
          </Link>
          <span className="text-[var(--text-secondary)] text-sm ml-2">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        {isOwner && !post.isShared && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={handleEdit}
              className="p-1.5 rounded hover:bg-[var(--bg-secondary)] hover:scale-110 transition-transform"
              aria-label="Edit post"
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 rounded hover:bg-[var(--bg-secondary)] hover:scale-110 transition-transform"
              aria-label="Delete post"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <RichTextEditor
            value={editContent}
            onChange={setEditContent}
            placeholder="Edit your post..."
            minHeight="100px"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="px-3 py-1.5 rounded bg-[var(--accent)] text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded border border-[var(--border-color)]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : isHtmlContent(post.content) ? (
        <div
          className="mt-2 post-content break-words"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      ) : (
        <p className="mt-2 whitespace-pre-wrap break-words">{displayContent}</p>
      )}

      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <MediaCollage media={post.mediaUrls} className="mt-3" />
      )}

      {(post.hashtags?.length || post.mentions?.length || post.location) ? (
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {post.hashtags?.map((tag) => (
            <Link
              key={tag}
              to={`/feed?hashtag=${tag}`}
              className="text-[var(--accent)] hover:underline"
            >
              #{tag}
            </Link>
          ))}
          {post.mentions?.map((m) => (
            <Link
              key={m}
              to={`/profile/${m}`}
              className="text-[var(--accent)] hover:underline"
            >
              @{m}
            </Link>
          ))}
          {post.location && (
            <span className="text-[var(--text-secondary)]">📍 {post.location}</span>
          )}
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-4 text-sm">
        <button
          type="button"
          onClick={handleLike}
          disabled={!currentUsername}
          className={`flex items-center gap-1 transition-transform hover:scale-110 ${isLiked ? 'text-[var(--accent)]' : ''}`}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'} {post.likeUsernames.length}
        </button>
        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 transition-transform hover:scale-110"
          aria-expanded={showComments}
        >
          💬 {comments.length}
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={!currentUsername}
          className="flex items-center gap-1 disabled:opacity-50 transition-transform hover:scale-110"
          aria-label="Share post"
        >
          📤 {post.shareCount}
        </button>
      </div>

      {showComments && (
        <CommentList postId={post.id} comments={comments} />
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Post"
        message="Are you sure you want to delete this post? This cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        variant="danger"
      />
    </article>
  );
}
