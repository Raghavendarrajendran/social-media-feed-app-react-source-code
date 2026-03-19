# Project Execution

## Running the Application

### Development Mode

```bash
npm run dev
```

- Starts Vite dev server
- Hot Module Replacement (HMR) enabled
- Open http://localhost:5173 in your browser

### Production Build

```bash
npm run build
```

- Compiles TypeScript and builds with Vite
- Output in `dist/` directory
- Optimized and minified for production

### Preview Production Build

```bash
npm run preview
```

- Serves the `dist/` folder locally
- Use to test the production build before deployment

## Running Tests

### Run All Tests (Single Run)

```bash
npm run test
```

- Runs all test files matching `src/**/*.{test,spec}.{ts,tsx}`
- Uses Vitest with jsdom environment
- Exits with code 0 on success, 1 on failure

### Run Tests in Watch Mode

```bash
npm run test:watch
```

- Re-runs tests when files change
- Useful during development

## Linting

```bash
npm run lint
```

- Runs ESLint on the project
- Reports any lint errors or warnings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New** → **Project** and import your repository
4. Vercel auto-detects Vite; ensure:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

The `vercel.json` in the project configures SPA routing so all routes serve `index.html`.

### Other Static Hosting

1. Build: `npm run build`
2. Deploy the `dist/` folder to Netlify, GitHub Pages, etc.
3. Configure SPA routing (all routes serve `index.html`)

## Default Test Accounts

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | admin@123 |
| Alice | alice | password123 |
| Bob | bob | password123 |

Use these to log in without registering.
