import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { logout } from '../store/slices/authSlice';
import { selectUserByUsername } from '../store/slices/usersSlice';
import { ThemeToggle } from './ThemeToggle';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const username = useAppSelector((s) => s.auth.currentUsername);
  const user = useAppSelector((s) =>
    username ? selectUserByUsername(s, username) : undefined
  );

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link
            to="/"
            className="flex-shrink-0 font-bold text-xl text-[var(--accent)] hover:opacity-90 transition-opacity"
          >
            Social Feed
          </Link>

          {/* Primary Links - Center (hidden on mobile) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/feed"
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  Feed
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/my-posts"
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  My Posts
                </Link>
                <Link
                  to={`/profile/${username}`}
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  Profile
                </Link>
              </>
            ) : (
                <>
                  <a
                    href="/#features"
                    className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Features
                  </a>
                <Link
                  to="/about"
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Right: Get Started / User + Theme Toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline text-sm text-[var(--text-secondary)]">
                  @{username}
                </span>
                <Link
                  to="/feed"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-[var(--danger)] hover:bg-red-500/10 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--accent)] text-white transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  Get Started
                </Link>
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="hidden sm:inline px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-color)]">
            <div className="flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/feed"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Feed
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/my-posts"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Posts
                  </Link>
                  <Link
                    to={`/profile/${username}`}
                    className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="/#features"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <Link
                    to="/about"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
