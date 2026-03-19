import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectUserByUsername } from '../store/slices/usersSlice';
import { selectAllPosts } from '../store/selectors/postSelectors';
import { useCallback } from 'react';
import * as XLSX from 'xlsx';

export function AdminDashboard() {
  const currentUsername = useAppSelector((s) => s.auth.currentUsername);
  const user = useAppSelector((s) =>
    currentUsername ? selectUserByUsername(s, currentUsername) : undefined
  );
  const allPosts = useAppSelector(selectAllPosts);
  const allUsers = useAppSelector((s) => Object.values(s.users.items));

  const isAdmin = user?.isAdmin === true;

  const userStats = allUsers.map((u) => {
    const posts = allPosts.filter((p) => p.authorUsername === u.username);
    const totalLikes = posts.reduce((sum, p) => sum + p.likeUsernames.length, 0);
    const totalComments = posts.reduce((sum, p) => sum + p.commentIds.length, 0);
    const totalShares = posts.reduce((sum, p) => sum + p.shareCount, 0);
    return {
      username: u.username,
      name: u.name,
      postCount: posts.length,
      totalLikes,
      totalComments,
      totalShares,
      joinedAt: u.createdAt,
    };
  });

  const downloadExcel = useCallback(() => {
    const ws = XLSX.utils.json_to_sheet(userStats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User Stats');
    XLSX.writeFile(wb, 'social-feed-user-stats.xlsx');
  }, [userStats]);

  if (!isAdmin) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          type="button"
          onClick={downloadExcel}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          Download Excel Report
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-secondary)]">
            <tr>
              <th className="text-left p-4 font-semibold">Username</th>
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Posts</th>
              <th className="text-left p-4 font-semibold">Likes</th>
              <th className="text-left p-4 font-semibold">Comments</th>
              <th className="text-left p-4 font-semibold">Shares</th>
              <th className="text-left p-4 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {userStats.map((stat) => (
              <tr
                key={stat.username}
                className="border-t border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/50 transition-colors"
              >
                <td className="p-4 font-medium">@{stat.username}</td>
                <td className="p-4">{stat.name}</td>
                <td className="p-4">{stat.postCount}</td>
                <td className="p-4">{stat.totalLikes}</td>
                <td className="p-4">{stat.totalComments}</td>
                <td className="p-4">{stat.totalShares}</td>
                <td className="p-4">
                  {new Date(stat.joinedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
