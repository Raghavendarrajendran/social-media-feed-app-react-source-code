import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

const FEATURES = [
  {
    icon: '📝',
    title: 'Create & Share',
    description:
      'Post your thoughts, share content, and engage with a community that values authentic expression.',
  },
  {
    icon: '💬',
    title: 'Real-time Comments',
    description:
      'Join conversations with threaded comments, likes, and reactions. Connect meaningfully with others.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description:
      'Your data stays yours. We use industry-standard practices to protect your privacy and security.',
  },
];

export function Home() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-20 sm:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
              <span className="hero-gradient-text">
                Connect. Share. Engage.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
              A modern social feed where you share your thoughts, discover content, and build meaningful connections—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-2">
              {isAuthenticated ? (
                <Link
                  to="/feed"
                  className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl bg-[var(--accent)] text-white transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] shadow-lg shadow-[var(--accent)]/25"
                >
                  Go to Feed
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl bg-[var(--accent)] text-white transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] shadow-lg shadow-[var(--accent)]/25"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl border-2 border-[var(--border-color)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">
            Why Choose Social Feed?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="group p-6 sm:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-3xl sm:text-4xl mb-4 inline-block transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
