import { http, HttpResponse } from 'msw';
import { mockUsers, mockPosts, mockComments } from '../data/mockData';

const API_BASE = '/api';

// In-memory mock database (resets on page load)
const db = {
  users: [...mockUsers],
  posts: [...mockPosts],
  comments: [...mockComments],
};

function mockHash(password: string): string {
  return `hash_${btoa(encodeURIComponent(password))}`;
}

export const handlers = [
  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json(db.users.map(({ passwordHash: _, ...u }) => u));
  }),

  http.post(`${API_BASE}/register`, async ({ request }) => {
    const body = (await request.json()) as { name: string; username: string; password: string };
    const exists = db.users.some((u) => u.username === body.username);
    if (exists) {
      return HttpResponse.json({ error: 'Username already exists' }, { status: 400 });
    }
    const newUser = {
      id: `u${Date.now()}`,
      name: body.name,
      username: body.username,
      passwordHash: mockHash(body.password),
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    return HttpResponse.json({ success: true });
  }),

  http.post(`${API_BASE}/login`, async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string };
    const user = db.users.find((u) => u.username === body.username);
    if (!user || user.passwordHash !== mockHash(body.password)) {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    return HttpResponse.json({ username: user.username });
  }),

  http.get(`${API_BASE}/posts`, () => {
    return HttpResponse.json(db.posts);
  }),

  http.get(`${API_BASE}/comments`, () => {
    return HttpResponse.json(db.comments);
  }),
];
