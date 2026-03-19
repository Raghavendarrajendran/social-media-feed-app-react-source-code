import { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectSortedPosts, type SortOption } from '../store/selectors/postSelectors';
import { PostCard } from '../components/PostCard';
import { SearchSort } from '../components/SearchSort';
import { CreatePostForm } from '../components/CreatePostForm';

export function Feed() {
  const [keyword, setKeyword] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');

  const posts = useAppSelector((s) =>
    selectSortedPosts(s, sort, keyword || undefined, usernameFilter || undefined)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feed</h1>
      <CreatePostForm />
      <SearchSort
        keyword={keyword}
        onKeywordChange={setKeyword}
        usernameFilter={usernameFilter}
        onUsernameFilterChange={setUsernameFilter}
        sort={sort}
        onSortChange={setSort}
      />
      {posts.length === 0 ? (
        <p className="text-[var(--text-secondary)] text-center py-8">
          No posts found. Create one above!
        </p>
      ) : (
        <div className="space-y-0">
          {posts.map((p) => (
            <PostCard key={p.id} postId={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}
