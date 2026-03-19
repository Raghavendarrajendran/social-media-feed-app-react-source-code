import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { logout } from '../store/slices/authSlice';
import { selectUserByUsername } from '../store/slices/usersSlice';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { to: '/feed', label: 'Feed', icon: '📰' },
  { to: '/my-posts', label: 'My Posts', icon: '📝' },
] as const;

function useBreadcrumbs() {
  const location = useLocation();
  const path = location.pathname;
  if (path === '/feed') return [{ label: 'Feed', to: '/feed' }];
  if (path === '/my-posts') return [{ label: 'My Posts', to: '/my-posts' }];
  if (path === '/admin') return [{ label: 'Admin', to: '/admin' }];
  const profileMatch = path.match(/^\/profile\/(.+)$/);
  if (profileMatch) {
    const username = profileMatch[1];
    return [
      { label: 'Profile', to: '/feed' },
      { label: `@${username}`, to: path },
    ];
  }
  return [{ label: 'Feed', to: '/feed' }];
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((s) => s.auth.currentUsername);
  const user = useAppSelector((s) =>
    username ? selectUserByUsername(s, username) : undefined
  );
  const breadcrumbs = useBreadcrumbs();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const SidebarContent = () => (
    <>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === to
                ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
                : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            <span aria-hidden>{icon}</span>
            {label}
          </Link>
        ))}
        {user?.isAdmin && (
          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === '/admin'
                ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
                : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            <span aria-hidden>⚙️</span>
            Admin
          </Link>
        )}
        <Link
          to={`/profile/${username}`}
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname.startsWith('/profile/')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
              : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
          }`}
        >
          <span aria-hidden>👤</span>
          Profile
        </Link>
      </nav>
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-3 px-4">
          <span className="text-sm text-[var(--text-secondary)]">@{username}</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--danger)] hover:bg-red-500/10 transition-colors"
        >
          <span aria-hidden>🚪</span>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Top bar with breadcrumbs */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 h-16 px-4 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex-shrink-0"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="text-xl">☰</span>
          </button>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 min-w-0 overflow-hidden">
            <Link
              to="/feed"
              className="font-bold text-lg text-[var(--accent)] hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Social Feed
            </Link>
            {breadcrumbs.length > 0 && (
              <>
                <span className="text-[var(--text-secondary)] flex-shrink-0">/</span>
                <ol className="flex items-center gap-2 flex-wrap">
                  {breadcrumbs.map((crumb, i) => (
                    <li key={crumb.to} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-[var(--text-secondary)]">›</span>
                      )}
                      {i === breadcrumbs.length - 1 ? (
                        <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {crumb.label}
                        </span>
                      ) : (
                        <Link
                          to={crumb.to}
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors truncate"
                        >
                          {crumb.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden sm:inline text-sm text-[var(--text-secondary)]">
            @{username}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar - desktop (sticky, toggled by hamburger) */}
        <aside
          className={`hidden md:flex md:flex-shrink-0 md:sticky md:top-16 md:self-start md:h-[calc(100vh-4rem)] md:flex-col border-r border-[var(--border-color)] bg-[var(--bg-primary)] transition-[width] duration-200 ${
            sidebarOpen ? 'md:w-64' : 'md:w-0 md:overflow-hidden md:border-r-0'
          }`}
        >
          <div className="w-64 flex-1 flex flex-col min-h-0 overflow-y-auto">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}

        {/* Sidebar - mobile (drawer) */}
        <aside
          className={`fixed top-16 left-0 bottom-0 z-50 w-64 bg-[var(--bg-primary)] border-r border-[var(--border-color)] transform transition-transform duration-200 ease-out md:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <SidebarContent />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
