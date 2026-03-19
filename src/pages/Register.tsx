import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useToast } from '../hooks/useToast';
import { registerThunk } from '../store/thunks/authThunks';
import { AuthSplitLayout } from '../components/AuthSplitLayout';

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading } = useAppSelector((s) => s.auth);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerThunk({ name, username, password })).unwrap();
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <AuthSplitLayout variant="register">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
            Name
          </label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <div>
          <label htmlFor="reg-username" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
            Username
          </label>
          <input
            id="reg-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium disabled:opacity-50 transition-colors"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Already have an account?{' '}
        <Link to="/login" className="text-[var(--accent)] hover:underline font-medium">
          Login
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
