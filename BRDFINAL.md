# Business Requirements Document (BRD)

## Social Media Feed Application

**Version:** 2.0  
**Last Updated:** March 2025

---

## 1. Executive Summary

The Social Media Feed Application is a frontend-only social media platform that enables users to create posts, share content, engage with others through comments and likes, and manage their presence. The application includes an admin dashboard for user and content oversight.

---

## 2. Project Overview

### 2.1 Purpose

Build a modern, responsive social feed application that demonstrates production-quality frontend development with React, Redux, and TypeScript. The application provides a complete user experience from registration through content creation and administration.

### 2.2 Scope

**In Scope:**
- User authentication (registration, login, logout)
- Post creation with rich text, media, hashtags, mentions, locations
- Feed browsing, search, and filtering
- Comments, likes, shares
- User profiles
- Admin dashboard with user stats and Excel export
- Dark/light theme
- Responsive design (mobile, tablet, desktop)

**Out of Scope:**
- Backend API (frontend-only with mock data)
- Real-time notifications
- Email verification
- Password reset
- Direct messaging

---

## 3. Stakeholders

| Role | Description |
|------|-------------|
| End User | Registered users who create and consume content |
| Admin | User with elevated privileges for user and content oversight |
| Developer | Development and maintenance of the application |

---

## 4. User Roles

### 4.1 Regular User

- Register and log in
- Create, edit, delete own posts
- Add images, videos, hashtags, mentions, locations
- Comment, like, share posts
- View own and others' profiles
- Search and filter feed

### 4.2 Admin

- All regular user capabilities
- Access Admin Dashboard
- View all users and post statistics
- Download Excel reports

---

## 5. Functional Requirements

### 5.1 Authentication

| ID | Requirement | Priority |
|----|--------------|----------|
| AUTH-01 | Users shall register with name, username, and password | Must |
| AUTH-02 | Username shall be unique; "admin" reserved | Must |
| AUTH-03 | Users shall log in with username and password | Must |
| AUTH-04 | Session shall persist via cookie across refreshes | Must |
| AUTH-05 | Login shall redirect to Feed; logout to landing page | Must |
| AUTH-06 | Non-admin users redirected from /admin shall go to Feed | Must |

### 5.2 Auth Pages (Login & Register)

| ID | Requirement | Priority |
|----|--------------|----------|
| AUTH-P-01 | Login and Register shall use 50/50 split layout | Must |
| AUTH-P-02 | Left side shall display carousel with info slides | Must |
| AUTH-P-03 | Right side shall display center-aligned form | Must |
| AUTH-P-04 | Carousel shall auto-advance every 4 seconds | Should |
| AUTH-P-05 | Layout shall follow static color patterns (CSS variables) | Must |

### 5.3 Dashboard Layout

| ID | Requirement | Priority |
|----|--------------|----------|
| DASH-01 | Post-login pages shall use dashboard layout | Must |
| DASH-02 | Left sidebar shall be sticky when scrolling | Must |
| DASH-03 | Header shall display breadcrumbs (e.g., Social Feed / Feed) | Must |
| DASH-04 | Hamburger shall toggle sidebar (mobile: drawer; desktop: collapse) | Must |
| DASH-05 | Sidebar shall include Feed, My Posts, Profile, Admin (if admin) | Must |

### 5.4 Posts & Feed

| ID | Requirement | Priority |
|----|--------------|----------|
| POST-01 | Users shall create posts with rich text (bold, italic, lists) | Must |
| POST-02 | Users shall attach images and videos to posts | Must |
| POST-03 | Multiple images shall display in collage layout | Must |
| POST-04 | Users shall use #hashtag and @mention in content | Must |
| POST-05 | Users shall add optional location to posts | Must |
| POST-06 | Users shall comment, like, share posts | Must |
| POST-07 | Owners shall edit and delete own posts; delete requires confirmation | Must |
| POST-08 | Feed shall support search by keyword and username | Must |
| POST-09 | Feed shall support sort (newest, oldest, most liked, etc.) | Must |

### 5.5 Toast Notifications

| ID | Requirement | Priority |
|----|--------------|----------|
| TOAST-01 | Error toasts shall require user to close manually | Must |
| TOAST-02 | Success toasts shall auto-close after 4 seconds | Must |
| TOAST-03 | Clear error messages (e.g., "Username already exists") | Must |

### 5.6 Admin

| ID | Requirement | Priority |
|----|--------------|----------|
| ADM-01 | Admin account: username admin, password admin@123 | Must |
| ADM-02 | Admin shall view all users and post stats | Must |
| ADM-03 | Admin shall download Excel report | Must |

### 5.7 UX

| ID | Requirement | Priority |
|----|--------------|----------|
| UX-01 | Hover effects on icons (like, comment, share, edit, delete) | Should |
| UX-02 | Dark and light theme with persistence | Must |
| UX-03 | Responsive design for mobile, tablet, desktop | Must |
| UX-04 | Accessibility: keyboard navigation, focus-visible, labels | Should |

---

## 6. Non-Functional Requirements

| ID | Requirement |
|----|--------------|
| NFR-01 | Input sanitization for XSS prevention |
| NFR-02 | Protected routes for authenticated content |
| NFR-03 | Safe cookie and localStorage usage |
| NFR-04 | Unit and component tests with Vitest |

---

## 7. Default Credentials

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | admin@123 |
| Alice | alice | password123 |
| Bob | bob | password123 |

---

## 8. Assumptions

- Application runs as frontend-only with mock data
- No backend API integration required for initial release
- Browser supports cookies and localStorage
- Modern browsers (Chrome, Firefox, Safari, Edge) are target

---

## 9. Constraints

- Frontend-only architecture
- No server-side persistence (data in localStorage)
- Single-page application (SPA) routing

---

## 10. Glossary

| Term | Definition |
|------|------------|
| Feed | Chronological list of posts from all users |
| Collage | Layout for displaying multiple images in a post |
| Toast | Temporary notification message |
| Breadcrumb | Navigation path showing current location |
| Dashboard | Post-login layout with sidebar and main content |

---

## 11. Related Documents

- [README.md](README.md) – Project overview
- [FEATURESLIST.md](FEATURESLIST.md) – Detailed feature list
- [HOWTOUSE.md](HOWTOUSE.md) – User guide
- [PROJECTSETUP.md](PROJECTSETUP.md) – Setup instructions
- [PROJECTEXECUTION.md](PROJECTEXECUTION.md) – Run, test, deploy
