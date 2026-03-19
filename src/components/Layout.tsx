import { Outlet, useLocation } from 'react-router-dom';
import { LandingNav } from './LandingNav';
import { Footer } from './Footer';

const DASHBOARD_PATHS = ['/feed', '/my-posts', '/admin'];
const isDashboardRoute = (path: string) =>
  DASHBOARD_PATHS.includes(path) || path.startsWith('/profile/');

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboard = isDashboardRoute(location.pathname);

  if (isDashboard) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main
        className={`flex-1 w-full mx-auto ${
          isLanding ? 'max-w-full px-4 sm:px-6 lg:px-8 py-6' : ''
        } ${
          isAuthPage ? 'max-w-full px-0 py-0' : ''
        } ${
          !isLanding && !isAuthPage ? 'max-w-3xl px-4 sm:px-6 lg:px-8 py-6' : ''
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
