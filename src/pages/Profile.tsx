import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectPostsByUsername } from '../store/selectors/postSelectors';
import { selectUserByUsername } from '../store/slices/usersSlice';
import { PostCard } from '../components/PostCard';

export function Profile() {
  const { username } = useParams<{ username: string }>();
  const user = useAppSelector((s) => (username ? selectUserByUsername(s, username) : undefined));
  const posts = useAppSelector((s) =>
    username ? selectPostsByUsername(s, username) : []
  );

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!username) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--text-secondary)]">Invalid profile</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
        <h1 className="text-2xl font-bold">@{username}</h1>
        {user && <p className="text-[var(--text-secondary)] mt-1">{user.name}</p>}
      </div>
      <h2 className="text-lg font-semibold mb-4">Posts & Shares</h2>
      {sortedPosts.length === 0 ? (
        <p className="text-[var(--text-secondary)] text-center py-8">
          No posts yet.
        </p>
      ) : (
        <div>
          {sortedPosts.map((p) => (
            <PostCard key={p.id} postId={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}
