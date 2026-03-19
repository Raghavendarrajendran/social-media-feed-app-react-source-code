# How to Use the Social Media Feed Application

## Getting Started

1. **Start the application**: Run `npm run dev` and open http://localhost:5173
2. **Register**: Create an account with name, username, and password
3. **Login**: Use your credentials to sign in (redirects to Feed)
4. **Create posts**: After logging in, go to Feed and write a post

## Default Credentials

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | admin@123 |
| Alice | alice | password123 |
| Bob | bob | password123 |

## User Flows

### Registration
- Go to Register
- 50/50 split page: left carousel with info slides, right form
- Enter name, username (must be unique; "admin" is reserved), and password
- On success, toast shows "Registration successful"; redirect to Login
- Errors (e.g., "Username already exists") show as toast; user must close

### Login
- Go to Login
- 50/50 split page: left carousel, right form
- Enter username and password
- On success, you are redirected to **Feed** (dashboard layout)
- Session is stored in a cookie and persists across refreshes

### Logout
- In dashboard: click Logout in the sidebar
- You are redirected to the **landing page** (/)

### Dashboard Layout (After Login)
- **Sticky sidebar** – Feed, My Posts, Profile, Admin (if admin)
- **Breadcrumbs** – Header shows current location (e.g., Social Feed / Feed)
- **Hamburger** – Toggle sidebar (mobile: drawer; desktop: collapse/expand)
- **Theme toggle** – In header

### Creating a Post
- Navigate to Feed
- Use the rich text editor (bold, italic, lists)
- Add optional location
- Add optional images/videos (collage layout for multiple images)
- Use #hashtag and @mention in content
- Click Post; success toast appears

### Interacting with Posts
- **Like**: Click the heart icon (hover effect)
- **Comment**: Click the comment count to expand comments
- **Share**: Click the share icon to create a shared copy
- **Edit/Delete**: Only visible on your own posts; delete shows confirmation modal

### Toast Messages
- **Error**: User must click ✕ to close (e.g., "Username already exists")
- **Success**: Auto-closes after 4 seconds (e.g., "Post created!")

### Admin Dashboard
- Log in as **admin** / **admin@123**
- Click "Admin" in the sidebar (or breadcrumb)
- View all users and their post stats
- Click "Download Excel Report" to export

### Theme
- Click the moon/sun icon in the header to toggle dark/light mode
- Theme preference is saved to localStorage

## Keyboard & Accessibility

- All interactive elements support keyboard navigation
- Focus-visible outlines are shown for keyboard users
- Form inputs have proper labels
