Act as a senior frontend engineer and build an advanced production-quality coding assessment solution.

Build a Social Media Feed Application using:
- React
- Vite
- TypeScript
- Redux Toolkit
- React-Redux
- React Router
- Jest
- React Testing Library
- optional Tailwind CSS

Core constraints:
- frontend only
- no real backend
- use a mock RESTful API approach such as json-server or MSW with JSON data
- all business logic must be handled in Redux Toolkit
- code must be modular, scalable, typed, reusable, and assessment-ready
- code must pass unit tests
- include dark mode and light mode
- follow frontend security best practices
- use cookies and localStorage safely
- include documentation markdown files

Build these pages/routes:
- Landing Page
- Register Page
- Login Page
- Feed Page
- My Posts Page
- User Profile Page
- Admin Dashboard Page
- Not Found Page

Navigation rules:
- after successful login, navigate to Feed Page
- after logout, navigate to Landing Page

Authentication requirements:
1. Registration page with:
- name
- username
- password

Rules:
- username must be unique
- show proper inline errors and toast messages
- after successful registration, navigate to login page

2. Login page:
- validate credentials from mock API/Redux data
- on success:
  - set isAuthenticated = true in Redux
  - store only a non-sensitive session reference such as username in cookie
  - navigate to Feed Page

3. Logout:
- clear Redux auth state
- clear cookie/session
- navigate to Landing Page

Seeded accounts:
- create admin account:
  - username: admin
  - password: admin@123
- create some static seeded demo users and document them in markdown files

Feed requirements:
- authenticated users can create posts
- posts support:
  - text
  - single image
  - multiple images
  - video
  - image collage
- allow hashtags in post text
- allow mentions in post text
- allow location tagging
- show parsed hashtags and mentions with styled UI
- show location in post metadata
- users can comment on any post
- users can like/unlike posts and comments
- users can share posts
- shared posts must have distinct UI styling
- show total comments, likes, and shares count for each post
- show edit/delete only for content owned by the logged-in user
- use confirmation dialog for deleting post/comment
- do not refetch parent feed unnecessarily after child actions

Collage maker requirements:
- allow selecting multiple images
- allow choosing from predefined collage layouts
- show collage preview before posting
- allow reordering/removing selected images
- validate supported file types and size
- show friendly errors for invalid uploads

Search / sort / filter:
- search by username
- search by keyword
- search/filter by hashtag
- search/filter by location
- sort by newest
- sort by oldest
- sort by most liked
- sort by most commented
- sort by most shared

User pages:
- My Posts page shows logged-in user posts
- User Profile page shows selected user's posts and shares

Toast and dialog behavior:
- all important errors should be shown with toast messages
- error toasts must be manually closable by the user
- success toasts may auto close
- delete actions must use dialog/confirmation modal
- inline validation errors should still be shown in forms

UI/UX requirements:
- clean modern social-feed UI
- responsive layout
- hover effects on cards, buttons, dropdown items
- hover icon effects on like/comment/share/edit/delete icons
- keyboard accessible controls
- proper focus-visible styles
- loading, empty, and error states across pages

Admin requirements:
- restrict admin dashboard to admin account only
- admin dashboard should list all users
- show stats of user post details
- include analytics such as:
  - total users
  - total posts
  - total comments
  - total shares
  - total likes
  - posts per user
  - comments per user
  - shares per user
  - most active users
  - most liked posts
- allow admin to download Excel reports

Excel export requirements:
- generate downloadable Excel files on frontend using a library like xlsx
- export:
  - users report
  - posts report
  - engagement stats report

Persistence requirements:
- persist Redux state to localStorage
- restore safe app state on refresh
- restore safe session using cookie
- persist theme selection
- handle malformed localStorage/cookie data safely

Theme requirements:
- implement dark mode and light mode
- theme toggle should be visible
- theme should persist across reloads
- theme should work in admin pages too

Security requirements:
- do not store sensitive tokens in localStorage or non-HttpOnly cookies
- cookie should store only non-sensitive session reference such as username
- validate and sanitize user input
- validate uploaded file type and size
- avoid dangerouslySetInnerHTML
- restrict protected routes
- restrict admin routes
- enforce owner checks in both UI rendering and Redux logic
- do not expose password values in logs/UI unnecessarily
- gracefully handle corrupted persisted state
- use safe utility wrappers for cookies/localStorage parsing

Testing requirements:
Use Jest and React Testing Library.
Write tests for:
- registration validation
- duplicate username error
- login success and failure
- redirect to Feed after login
- redirect to Landing after logout
- protected route behavior
- cookie set/clear utilities
- post creation
- image/video validation
- collage utility behavior
- comment creation
- owner-only edit/delete visibility
- delete dialog behavior
- toast behavior rules
- reducer logic for like/share/comment/post updates
- theme toggle persistence
- localStorage persistence utilities
- admin route protection
- Excel export utility behavior

Architecture expectations:
- use Redux Toolkit slices and async thunks
- typed store and typed hooks
- separate pages, components, features, services, hooks, utils, tests
- use memoized selectors when useful
- avoid unnecessary rerenders and unnecessary parent refetches
- keep implementation interview-friendly and easy to explain

Suggested entities:

User:
- id
- name
- username
- passwordHash or safely handled mock password
- role
- createdAt

Post:
- id
- authorUsername
- content
- hashtags
- mentions
- location
- mediaType
- mediaUrls or local mock media references
- collageLayout
- createdAt
- updatedAt
- likeUsernames
- shareCount
- isShared
- sharedFromPostId
- sharedByUsername
- commentIds

Comment:
- id
- postId
- authorUsername
- content
- hashtags
- mentions
- createdAt
- updatedAt
- likeUsernames

Documentation requirements:
Create and fully update these markdown files:
- README.md
- FEATURES.md
- ARCHITECTURE.md
- TESTING.md
- SECURITY.md
- SEED_USERS.md

Markdown documentation must include:
- full feature list
- setup instructions
- run instructions
- test commands
- architecture explanation
- persistence strategy
- route flow
- security practices
- admin credentials
- static seeded user credentials

Also provide:
- package dependency list
- full folder structure
- setup steps
- run instructions
- test instructions

Make the app advanced-level, polished, secure, responsive, and assessment-ready.