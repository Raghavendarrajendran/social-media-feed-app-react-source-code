import { useState, useEffect } from 'react';

export interface AuthSlide {
  icon: string;
  title: string;
  description: string;
}

const LOGIN_SLIDES: AuthSlide[] = [
  {
    icon: '✨',
    title: 'Welcome back',
    description: 'Sign in to continue sharing, connecting, and engaging with your community.',
  },
  {
    icon: '📝',
    title: 'Your feed awaits',
    description: 'Discover posts from people you follow and join the conversation.',
  },
  {
    icon: '🔒',
    title: 'Secure sign-in',
    description: 'Your account is protected. We never share your data with third parties.',
  },
];

const REGISTER_SLIDES: AuthSlide[] = [
  {
    icon: '🚀',
    title: 'Join the community',
    description: 'Create your account and start sharing your thoughts with the world.',
  },
  {
    icon: '💬',
    title: 'Connect & engage',
    description: 'Post updates, comment, like, and share. Build meaningful connections.',
  },
  {
    icon: '📸',
    title: 'Rich media posts',
    description: 'Share images, videos, hashtags, and locations. Express yourself fully.',
  },
];

interface AuthCarouselProps {
  slides: AuthSlide[];
}

function AuthCarousel({ slides }: AuthCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <div className="h-full flex flex-col justify-center px-12 lg:px-16 xl:px-20">
      <div className="max-w-md">
        <span className="text-5xl lg:text-6xl mb-6 block" aria-hidden>
          {slide.icon}
        </span>
        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
          {slide.title}
        </h2>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          {slide.description}
        </p>
      </div>
      <div className="flex gap-2 mt-10" aria-label="Carousel navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-8 bg-[var(--accent)]'
                : 'w-2 bg-[var(--border-color)] hover:bg-[var(--text-secondary)]'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  variant: 'login' | 'register';
}

export function AuthSplitLayout({ children, variant }: AuthSplitLayoutProps) {
  const slides = variant === 'login' ? LOGIN_SLIDES : REGISTER_SLIDES;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col md:flex-row">
      {/* Left: Carousel - 50% */}
      <div className="auth-panel-left w-full md:w-1/2 min-h-[280px] md:min-h-0 border-b md:border-b-0 md:border-r border-[var(--border-color)]">
        <AuthCarousel slides={slides} />
      </div>
      {/* Right: Form - 50%, center aligned */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-[var(--bg-primary)]">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
