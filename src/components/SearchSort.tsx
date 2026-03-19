import type { SortOption } from '../store/selectors/postSelectors';

interface SearchSortProps {
  keyword: string;
  onKeywordChange: (v: string) => void;
  usernameFilter: string;
  onUsernameFilterChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'mostLiked', label: 'Most Liked' },
  { value: 'mostCommented', label: 'Most Commented' },
  { value: 'mostShared', label: 'Most Shared' },
];

export function SearchSort({
  keyword,
  onKeywordChange,
  usernameFilter,
  onUsernameFilterChange,
  sort,
  onSortChange,
}: SearchSortProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label htmlFor="search-keyword" className="sr-only">
          Search by keyword
        </label>
        <input
          id="search-keyword"
          type="search"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Search by keyword..."
          className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)]"
          aria-label="Search by keyword"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="search-username" className="sr-only">
          Search by username
        </label>
        <input
          id="search-username"
          type="search"
          value={usernameFilter}
          onChange={(e) => onUsernameFilterChange(e.target.value)}
          placeholder="Search by username..."
          className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)]"
          aria-label="Search by username"
        />
      </div>
      <div className="min-w-[180px]">
        <label htmlFor="sort" className="sr-only">
          Sort posts
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)]"
          aria-label="Sort posts"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
