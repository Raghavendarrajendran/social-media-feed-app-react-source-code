# Features List

## Authentication

- **Registration** – Create account with name, username, and password
- **Unique Username** – Username must be unique; "admin" is reserved
- **Login** – Validate credentials; redirects to Feed on success
- **Logout** – Clear session and redirect to landing page
- **Session Persistence** – Non-sensitive session reference stored in cookie
- **Protected Routes** – Guarded routes for authenticated users only

## Auth Pages (Login & Register)

- **50/50 Split Layout** – Left: info carousel; right: center-aligned form
- **Carousel Slides** – Auto-advancing slides (4s) with dot indicators
- **Login Slides** – Welcome back, Your feed awaits, Secure sign-in
- **Register Slides** – Join the community, Connect & engage, Rich media posts
- **Static Color Patterns** – Uses `--bg-primary`, `--bg-secondary`, `--accent` variables
- **Responsive** – Mobile: carousel top, form below; desktop: side-by-side

## Dashboard Layout (Post-Login)

- **Sticky Sidebar** – Left nav stays visible when scrolling
- **Breadcrumbs** – Header shows path (e.g., Social Feed / Feed, Profile / @username)
- **Hamburger Menu** – Toggles sidebar on mobile (drawer) and desktop (collapse)
- **Nav Items** – Feed, My Posts, Profile, Admin (if admin)
- **Logout** – In sidebar footer
- **Theme Toggle** – In header

## Feed & Posts

- **Rich Text Editor** – Bold, italic, strikethrough, lists
- **Images & Videos** – Attach images and videos to posts
- **Collage Maker** – Multiple images displayed in collage layout (1–4+ images)
- **Hashtags** – Use #hashtag in content; clickable links
- **Mentions** – Use @username in content; links to user profile
- **Location** – Optional location field per post
- **Comment on Posts** – Users can comment on any post
- **Like/Unlike** – Like or unlike posts and comments
- **Share Posts** – Share posts to create a shared copy in the feed
- **Edit/Delete** – Owner-only edit and delete; confirmation modal for delete
- **Post Metrics** – Comment count, like count, share count per post

## Toast Notifications

- **Error Toasts** – User must close manually (e.g., "Username already exists")
- **Success Toasts** – Auto-close after 4 seconds (e.g., "Post created!")
- **Delete Confirmation** – Modal dialogue before deleting posts

## Admin

- **Admin Account** – Username: admin, Password: admin@123
- **Admin Dashboard** – List all users with post stats
- **Excel Export** – Download user stats report

## Pages

- **Home/Landing** – Hero, features grid, CTAs
- **Login** – Split layout with carousel
- **Register** – Split layout with carousel
- **Feed** – Main feed (dashboard layout)
- **My Posts** – Posts and shares by logged-in user (dashboard layout)
- **User Profile** – Selected user's posts and shares (dashboard layout)
- **Admin Dashboard** – List users, stats, Excel export (admin only, dashboard layout)
- **About, Privacy, Terms** – Static pages

## UX & Hover Effects

- **Hover Icon Effects** – Like, comment, share, edit, delete buttons scale on hover
- **Responsive Design** – Mobile, tablet, laptop, desktop
- **Loading, Empty, Error States**
- **Accessibility** – Semantic markup, focus-visible styles

## Default Credentials

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | admin@123 |
| Alice | alice | password123 |
| Bob | bob | password123 |
