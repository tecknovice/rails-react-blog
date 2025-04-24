
# Web Application Design Document

**Stack**: Ruby on Rails (API mode) · MySQL · React · Vite · TypeScript · React Query · TailwindCSS 

---

## Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [API Specification](#api-specification)
4. [Backend (Rails) Structure](#backend-rails-structure)
5. [Authentication & Authorization](#authentication--authorization)
6. [Frontend (React) Structure](#frontend-react-structure)
7. [Environment & Deployment](#environment--deployment)
8. [Security & Validation](#security--validation)

---

## Overview

- **Users**: Public (view blogs), Registered (CRUD own blogs, manage profile), Admin (manage users & all blogs)
- **Features**:
  - Registration, login, profile management
  - Blog CRUD: create, update, publish/unpublish, delete
  - Public blog listing & detail view
  - Admin dashboard for user & blog management
- **Auth**: JWT-based, Rails issues tokens, front-end stores in `localStorage`
- **Data flow**: React Query handles data fetching, caching, mutations

---

## Database Schema

| Table      | Columns                                                                                           | Relations                                    |
|------------|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| users      | id: bigint PK, email: string (unique), password_digest: string, role: enum(`user`,`admin`), name, avatar_url, created_at, updated_at | has_many :blogs                             |
| blogs      | id: bigint PK, user_id: bigint FK, title: string, content: text, status: enum(`draft`,`published`), published_at: datetime, created_at, updated_at | belongs_to :user                            |
| profiles   | id: bigint PK, user_id: bigint FK, bio: text, website: string, location: string, created_at, updated_at | belongs_to :user, one-to-one                |

- **Indexes**:
  - `users.email` (unique)
  - `blogs.user_id`
  - `blogs.status`

---

## API Specification

_All endpoints prefixed with `/api`._

### Authentication

| Method | Path               | Auth   | Request Body                   | Response                   | Description                    |
|--------|--------------------|--------|--------------------------------|----------------------------|--------------------------------|
| POST   | `/auth/register`   | Public | `{ name, email, password }`    | `{ user, token }`          | Register new user              |
| POST   | `/auth/login`      | Public | `{ email, password }`          | `{ user, token }`          | Login & get JWT                |
| GET    | `/auth/me`         | Bearer | —                              | `{ user }`                 | Get current user profile       |

### Users & Profiles

| Method | Path                 | Auth      | Request Body                | Response         | Description                   |
|--------|----------------------|-----------|-----------------------------|------------------|-------------------------------|
| GET    | `/users`             | Admin     | —                           | `[users]`        | List all users                |
| GET    | `/users/:id`         | Admin     | —                           | `{ user }`       | Get user details              |
| PUT    | `/users/:id`         | Admin     | `{ name, role, ... }`       | `{ user }`       | Update any user               |
| DELETE | `/users/:id`         | Admin     | —                           | `{ message }`    | Delete user                   |
| GET    | `/profile`           | Bearer    | —                           | `{ profile }`    | Get own profile               |
| PUT    | `/profile`           | Bearer    | `{ bio, website, location }`| `{ profile }`    | Update own profile            |

### Blogs

| Method | Path                   | Auth      | Request Body                          | Response        | Description                          |
|--------|------------------------|-----------|---------------------------------------|-----------------|--------------------------------------|
| GET    | `/blogs`               | Public    | —                                     | `[blogs]`       | List published blogs (public)        |
| GET    | `/blogs/:id`           | Public    | —                                     | `{ blog }`      | View blog detail                     |
| POST   | `/blogs`               | Bearer    | `{ title, content, status }`          | `{ blog }`      | Create blog (draft or publish)       |
| PUT    | `/blogs/:id`           | Bearer    | `{ title, content, status }`          | `{ blog }`      | Update own blog                     |
| DELETE | `/blogs/:id`           | Bearer    | —                                     | `{ message }`   | Delete own blog                     |
| GET    | `/admin/blogs`         | Admin     | —                                     | `[blogs]`       | List all blogs for admin            |
| PUT    | `/admin/blogs/:id`     | Admin     | `{ status }`                         | `{ blog }`      | Admin update any blog               |
| DELETE | `/admin/blogs/:id`     | Admin     | —                                     | `{ message }`   | Admin delete any blog               |

---

## Backend (Rails) Structure

Folder: `backend/`

```
backend/
├─ app/
│  ├─ controllers/
│  │  ├─ api/
│  │  │  ├─ auth_controller.rb
│  │  │  ├─ users_controller.rb
│  │  │  ├─ profiles_controller.rb
│  │  │  └─ blogs_controller.rb
│  │  └─ admin/
│  │     ├─ users_controller.rb
│  │     └─ blogs_controller.rb
│  ├─ models/
│  │  ├─ user.rb
│  │  ├─ profile.rb
│  │  └─ blog.rb
│  ├─ serializers/
│  │  ├─ user_serializer.rb
│  │  ├─ profile_serializer.rb
│  │  └─ blog_serializer.rb
│  └─ policies/
│     ├─ user_policy.rb
│     └─ blog_policy.rb
```

- **Gems**: `bcrypt`, `jwt`, `mysql2`, `rack-cors`, `solid_cache`, `solid_queue`, `solid_cable`, `kamal`, `bootsnap`, `thruster`
- **Routes**: namespaced under `/api`, with `namespace :admin` for admin routes.

---

## Authentication & Authorization

1. **Registration/Login**: Use the `jwt` gem for manual JWT issuance and verification. The backend generates a JWT upon successful login, and the frontend stores it in `localStorage` and attaches it to the `Authorization` header for subsequent requests.
   
2. **Protecting endpoints**: Use a custom `authenticate_request` method in your controllers to check for valid JWTs. This method will decode the JWT and ensure the user is authenticated.

3. **Role checks**: Policies for user roles:
   - `UserPolicy`: Only admins can `index`, `update`, and `destroy` other users.
   - `BlogPolicy`: Owners or admins can `update` and `destroy` blogs; the public can `show` blogs with `status=published`.

---

## Frontend (React) Structure

Folder: `frontend/`

```
frontend/
├─ src/
│  ├─ api/
│  │  ├─ auth.ts
│  │  ├─ users.ts
│  │  ├─ profile.ts
│  │  └─ blogs.ts
│  ├─ components/
│  │  ├─ AuthForm.tsx
│  │  ├─ BlogList.tsx
│  │  ├─ BlogEditor.tsx
│  │  ├─ BlogDetail.tsx
│  │  ├─ AdminSidebar.tsx
│  │  ├─ AdminHeader.tsx
│  │  ├─ AdminLayout.tsx
│  │  └─ AdminCard.tsx
│  ├─ contexts/
│  │  └─ AuthContext.tsx
│  ├─ pages/
│  │  ├─ index.tsx
│  │  ├─ login.tsx
│  │  ├─ register.tsx
│  │  ├─ profile.tsx
│  │  ├─ blogs/
│  │  │  ├─ [id].tsx
│  │  │  └─ new.tsx
│  │  └─ admin/
│  │     ├─ index.tsx
│  │     ├─ users.tsx
│  │     └─ blogs.tsx
│  ├─ layouts/
│  │  └─ DefaultLayout.tsx
│  ├─ routes.tsx
│  └─ vite.config.ts
```

- **React Query**: Configure `QueryClient` at the root of your app and use `useMutation` for POST/PUT/DELETE operations.
- **Auth flow**: Store JWT in `localStorage` and set the `Authorization` header via Axios or Fetch for subsequent API requests.

---

## Environment & Deployment

| Key                    | Description                      |
|------------------------|----------------------------------|
| RAILS_ENV              | development / production         |
| DATABASE_URL           | mysql2://user:pass@host/db_name  |
| JWT_SECRET_KEY         | your_secure_random_key          |
| VITE_API_BASE_URL      | e.g. `https://api.example.com`   |
| VITE_APP_JWT_KEY       | `Authorization` header key       |

- **Deployment**: Docker-compose with Rails, MySQL, Redis, and Vite (NGINX)

---

## Security & Validation

- **Backend validations**: presence, length, format on models
- **Strong params** in controllers
- **CORS**: Allow frontend origin
- **Rate limiting**: Rack::Attack for auth endpoints
- **XSS/CSRF**: API mode; React client handles CSRF via JWT
