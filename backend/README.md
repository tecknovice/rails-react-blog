# Rails React Blog - Backend

A robust REST API backend built with Ruby on Rails for the Blog Application.

## Technologies

- Ruby on Rails (API mode)
- MySQL
- JWT Authentication
- Active Record Serializers
- CORS support

## Prerequisites

- Ruby 3.2.0+
- Rails 7.1.0+
- MySQL 8.0+

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd rails-react-blog/backend
```

2. Install dependencies

```bash
bundle install
```

3. Database setup

```bash
rails db:create
rails db:migrate
rails db:seed  # Optional: creates sample data
```

4. Start the server

```bash
rails server -p 3000
```

The API will be available at `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint        | Description           | Request Body                | Response                |
|--------|-----------------|------------------------|----------------------------|-------------------------|
| POST   | `/auth/register`| Register new user     | `{name, email, password}`  | `{user, token}`         |
| POST   | `/auth/login`   | Login existing user   | `{email, password}`        | `{user, token}`         |
| GET    | `/auth/me`      | Get current user      | -                          | `{user}`                |

### Blogs

| Method | Endpoint      | Description           | Auth Required | Request Body                   |
|--------|---------------|------------------------|---------------|--------------------------------|
| GET    | `/blogs`      | List published blogs   | No            | -                              |
| GET    | `/blogs/:id`  | View a blog            | No            | -                              |
| POST   | `/blogs`      | Create a blog          | Yes           | `{title, content, status}`     |
| PUT    | `/blogs/:id`  | Update a blog          | Yes (Owner)   | `{title, content, status}`     |
| DELETE | `/blogs/:id`  | Delete a blog          | Yes (Owner)   | -                              |

### Profile

| Method | Endpoint   | Description            | Auth Required | Request Body                 |
|--------|------------|------------------------|---------------|-----------------------------|
| GET    | `/profile` | Get current user profile | Yes           | -                           |
| PUT    | `/profile` | Update profile         | Yes           | `{bio, website, location}`  |

### Admin

| Method | Endpoint         | Description           | Auth Required | Request Body    |
|--------|------------------|-----------------------|---------------|-----------------|
| GET    | `/admin/users`   | List all users        | Admin only    | -               |
| GET    | `/admin/blogs`   | List all blogs        | Admin only    | -               |
| PUT    | `/admin/blogs/:id` | Update any blog     | Admin only    | `{status}`      |
| DELETE | `/admin/blogs/:id` | Delete any blog     | Admin only    | -               |

## Models

### User
- `name`: string
- `email`: string (unique)
- `password_digest`: string
- `role`: enum('user', 'admin')
- Has many blogs
- Has one profile

### Blog
- `title`: string
- `content`: text
- `status`: enum('draft', 'published')
- `published_at`: datetime
- Belongs to user

### Profile
- `bio`: text
- `website`: string
- `location`: string
- Belongs to user

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database Optimization

- Tables are indexed appropriately for performance
- N+1 query prevention through eager loading
- Efficient query caching

## License

MIT
