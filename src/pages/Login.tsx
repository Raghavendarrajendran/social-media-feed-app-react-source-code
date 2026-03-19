import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useToast } from '../hooks/useToast';
import { loginThunk } from '../store/thunks/authThunks';
import { clearError } from '../store/slices/authSlice';
import { store } from '../store';
import { selectUserByUsername } from '../store/slices/usersSlice';
import { AuthSplitLayout } from '../components/AuthSplitLayout';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { loading } = useAppSelector((s) => s.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/feed';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      await dispatch(loginThunk({ username, password })).unwrap();
      toast.success('Login successful!');
      const state = store.getState();
      const user = selectUserByUsername(state, state.auth.currentUsername ?? '');
      const target = from === '/admin' && !user?.isAdmin ? '/feed' : from;
      navigate(target, { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <AuthSplitLayout variant="login">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-username" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
            Username
          </label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium disabled:opacity-50 transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Don't have an account?{' '}
        <Link to="/register" className="text-[var(--accent)] hover:underline font-medium">
          Register
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
