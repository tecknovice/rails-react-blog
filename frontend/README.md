# Rails React Blog - Frontend

A modern, responsive frontend for the Blog Application built with React, Vite, TypeScript, and Tailwind CSS.

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Shadcn UI
- React Router
- React Query (TanStack Query)
- Axios

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd rails-react-blog/frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The development server will start at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
frontend/
├── public/             # Static files
├── src/
│   ├── api/            # API client and endpoints
│   │   ├── ui/         # Shadcn UI components
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.tsx         # Main App component
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.cjs # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Features

- **Authentication**: JWT-based authentication with login, register, and profile management
- **Blog Management**: Create, read, update, and delete blog posts
- **Responsive Design**: Works on all screen sizes
- **Dark Mode**: Support for light and dark themes
- **API Integration**: Seamless integration with the Rails backend
- **Data Caching**: Efficient data fetching and caching with React Query

## UI Components

The application uses custom UI components built with Tailwind CSS and Shadcn UI:

- Buttons
- Cards
- Inputs
- Textareas
- Navigation
- Layout components

## API Integration

The frontend communicates with the Rails backend using Axios. All API-related code is in the `src/api` directory:

- `axios.ts`: Axios configuration with interceptors for JWT handling
- `auth.ts`: Authentication endpoints
- `blogs.ts`: Blog-related endpoints
- `profile.ts`: Profile-related endpoints

## State Management

- React Query for server state
- React Context for application state (authentication)
- Local component state for UI state

## Routes

| Path             | Component          | Description               | Auth Required |
|------------------|---------------------|---------------------------|---------------|
| `/`              | HomePage            | Home page with blog list   | No            |
| `/login`         | LoginPage           | User login                | No            |
| `/register`      | RegisterPage        | User registration         | No            |
| `/blogs/:id`     | BlogDetailPage      | Blog detail view          | No            |
| `/blogs/new`     | NewBlogPage         | Create new blog           | Yes           |
| `/profile`       | ProfilePage         | User profile management   | Yes           |
| `/admin`         | AdminDashboardPage  | Admin dashboard           | Admin only    |
| `/admin/users`   | AdminUsersPage      | User management           | Admin only    |
| `/admin/blogs`   | AdminBlogsPage      | Blog management           | Admin only    |

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## License

MIT
