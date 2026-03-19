import { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectPostsByUsername } from '../store/selectors/postSelectors';
import { selectSortedPosts, type SortOption } from '../store/selectors/postSelectors';
import { PostCard } from '../components/PostCard';
import { SearchSort } from '../components/SearchSort';

export function MyPosts() {
  const currentUsername = useAppSelector((s) => s.auth.currentUsername);
  const [keyword, setKeyword] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');

  const myPosts = useAppSelector((s) =>
    currentUsername ? selectPostsByUsername(s, currentUsername) : []
  );

  const filteredAndSorted = useAppSelector((s) =>
    selectSortedPosts(s, sort, keyword || undefined, usernameFilter || undefined)
  ).filter((p) => myPosts.some((mp) => mp.id === p.id));

  if (!currentUsername) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      <SearchSort
        keyword={keyword}
        onKeywordChange={setKeyword}
        usernameFilter={usernameFilter}
        onUsernameFilterChange={setUsernameFilter}
        sort={sort}
        onSortChange={setSort}
      />
      {filteredAndSorted.length === 0 ? (
        <p className="text-[var(--text-secondary)] text-center py-8">
          You haven't posted anything yet.
        </p>
      ) : (
        <div>
          {filteredAndSorted.map((p) => (
            <PostCard key={p.id} postId={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}
