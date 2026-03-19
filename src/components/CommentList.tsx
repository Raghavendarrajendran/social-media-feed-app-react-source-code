import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { addCommentToPost } from '../store/slices/postsSlice';
import {
  addComment,
  likeComment,
  unlikeComment,
  updateComment,
  removeComment,
} from '../store/slices/commentsSlice';
import { removeCommentFromPost } from '../store/slices/postsSlice';
import type { Comment } from '../types';
import { sanitizeForStorage } from '../utils/sanitize';
import { ConfirmModal } from './ConfirmModal';

interface CommentListProps {
  postId: string;
  comments: Comment[];
}

export function CommentList({ postId, comments }: CommentListProps) {
  const dispatch = useAppDispatch();
  const currentUsername = useAppSelector((s) => s.auth.currentUsername);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deleteModalCommentId, setDeleteModalCommentId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!currentUsername || !newComment.trim()) return;
    const content = sanitizeForStorage(newComment, 1000);
    const comment: Comment = {
      id: `c_${Date.now()}`,
      postId,
      authorUsername: currentUsername,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeUsernames: [],
    };
    dispatch(addComment(comment));
    dispatch(addCommentToPost({ postId, commentId: comment.id }));
    setNewComment('');
  };

  const handleEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditContent(c.content);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editContent.trim()) return;
    const comment = comments.find((x) => x.id === editingId);
    if (!comment) return;
    dispatch(
      updateComment({
        ...comment,
        content: sanitizeForStorage(editContent, 1000),
      })
    );
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (commentId: string) => {
    dispatch(removeComment(commentId));
    dispatch(removeCommentFromPost({ postId, commentId }));
    setDeleteModalCommentId(null);
  };

  return (
    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
      <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
        Comments
      </h3>

      {currentUsername && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 rounded border border-[var(--border-color)] bg-[var(--input-bg)]"
            maxLength={1000}
            aria-label="New comment"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="px-3 py-2 rounded bg-[var(--accent)] text-white disabled:opacity-50"
          >
            Post
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {comments.map((c) => {
          const isOwner = c.authorUsername === currentUsername;
          const isLiked = currentUsername && c.likeUsernames.includes(currentUsername);
          const isEditing = editingId === c.id;

          return (
            <li
              key={c.id}
              className="p-3 rounded-lg bg-[var(--bg-secondary)]"
              data-testid={`comment-${c.id}`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="font-medium text-sm">@{c.authorUsername}</span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              {isEditing ? (
                <div className="mt-2">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--input-bg)]"
                    maxLength={1000}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="px-2 py-1 text-sm rounded bg-[var(--accent)] text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditContent('');
                      }}
                      className="px-2 py-1 text-sm rounded border border-[var(--border-color)]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-sm whitespace-pre-wrap break-words">{c.content}</p>
              )}
              <div className="mt-2 flex items-center gap-3">
                {currentUsername && (
                  <button
                    type="button"
                    onClick={() =>
                      isLiked
                        ? dispatch(unlikeComment({ commentId: c.id, username: currentUsername }))
                        : dispatch(likeComment({ commentId: c.id, username: currentUsername }))
                    }
                    className={`text-sm ${isLiked ? 'text-[var(--accent)]' : ''}`}
                  >
                    {isLiked ? '❤️' : '🤍'} {c.likeUsernames.length}
                  </button>
                )}
                {isOwner && !isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleEdit(c)}
                      className="text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteModalCommentId(c.id)}
                      className="text-sm text-[var(--danger)] hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <ConfirmModal
        isOpen={deleteModalCommentId !== null}
        title="Delete Comment"
        message="Are you sure you want to delete this comment?"
        confirmLabel="Delete"
        onConfirm={() => deleteModalCommentId && handleDelete(deleteModalCommentId)}
        onCancel={() => setDeleteModalCommentId(null)}
        variant="danger"
      />
    </div>
  );
}
