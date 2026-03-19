# Project Setup

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 9+

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd social-media-feed-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify setup**
   ```bash
   npm run build
   npm run test
   ```

## Default Credentials (Seed Accounts)

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | admin@123 |
| Alice | alice | password123 |
| Bob | bob | password123 |

## Environment

No environment variables are required. The application runs entirely on the frontend with mock data.

## Optional: MSW (Mock Service Worker)

The project includes MSW for mocking API calls. The service worker is pre-generated in `public/mockServiceWorker.js`. To regenerate:

```bash
npx msw init public/ --save
```

## IDE Setup

- **VS Code**: Recommended extensions: ESLint, Tailwind CSS IntelliSense
- **TypeScript**: Strict mode is enabled

## Troubleshooting

### Build fails with TypeScript errors
- Run `npm run build` and fix any reported type errors

### Tests fail
- Run `npm run test` to see failures
- Ensure `src/test/setup.ts` is loaded (configured in `vite.config.ts`)

### Tailwind styles not applied
- Ensure `@tailwindcss/vite` is in `vite.config.ts` plugins
- Check that `src/index.css` imports Tailwind: `@import "tailwindcss"`
