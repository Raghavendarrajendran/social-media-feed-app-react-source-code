import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { restoreSession } from './store/slices/authSlice';
import { getSessionCookie } from './utils/cookie';
import { selectUserByUsername } from './store/slices/usersSlice';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { ThemeSync } from './components/ThemeSync';
import { ToastContainer } from './components/Toast';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Feed } from './pages/Feed';
import { MyPosts } from './pages/MyPosts';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AdminDashboard } from './pages/AdminDashboard';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AppRoutes() {
  useEffect(() => {
    const username = getSessionCookie();
    if (username) {
      const state = store.getState();
      const user = selectUserByUsername(state, username);
      if (user) {
        store.dispatch(restoreSession(username));
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="feed" element={<Feed />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <ThemeSync />
        <ToastContainer />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeWrapper>
    </Provider>
  );
}

export default App;
