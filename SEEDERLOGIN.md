# Seeder Login Credentials

Pre-configured accounts for testing and development. These users are loaded from `src/data/mockData.ts` and are always available (merged into persisted state on app load).

## Credentials

| Account | Username | Password | Role |
|---------|----------|----------|------|
| **Admin** | admin | admin@123 | Administrator |
| Alice | alice | password123 | User |
| Bob | bob | password123 | User |

## Usage

1. Start the app: `npm run dev`
2. Go to [http://localhost:5173/login](http://localhost:5173/login)
3. Enter username and password from the table above
4. Click **Login**

## Admin Account

- **Username:** admin  
- **Password:** admin@123  
- **Access:** Admin Dashboard (user list, post stats, Excel export)  
- **Note:** Username "admin" is reserved and cannot be used for new registrations

## Seed Users

| User | Name | Username | Password |
|------|------|----------|----------|
| Admin | Administrator | admin | admin@123 |
| Alice | Alice Johnson | alice | password123 |
| Bob | Bob Smith | bob | password123 |

## Seed Data

- **Alice** has 1 post ("Hello world! My first post.") with 1 like from Bob and 1 comment  
- **Bob** has 1 post ("React and Redux are awesome!") with 1 like from Alice and 1 comment  

## Reset

If you encounter login issues (e.g., after clearing localStorage), clear the app's `social_feed_state` from localStorage and refresh. The seed users are re-injected on load.
