# Rails React Blog

A full-stack blog application with a Ruby on Rails API backend and a React TypeScript frontend.

## Overview

This project is a modern blog platform featuring:

- Secure JWT-based authentication
- User role management (admin/user)
- Blog creation, editing, publishing
- User profile management
- Responsive design with TailwindCSS and Shadcn UI
- Efficient data fetching with React Query

## Architecture

The application is separated into two main parts:

- **Backend**: Ruby on Rails API
- **Frontend**: React with TypeScript, Vite, and TailwindCSS

## Getting Started

### Prerequisites

- Ruby 3.2.0+
- Node.js 18+
- MySQL 8.0+

### Running the Backend

```bash
cd backend
bundle install
rails db:create db:migrate
rails s -p 3000
```

The API will be available at `http://localhost:3000`.

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

## Features

- **Authentication System**
  - User registration and login
  - JWT token-based authentication
  - Role-based authorization

- **Blog Management**
  - Create, read, update, delete blogs
  - Drafts and publishing workflow
  - Rich text content

- **User Management**
  - User profiles
  - Admin user management
  - Role assignment

- **Modern UI**
  - Responsive design
  - Light/dark theme support
  - Component-based architecture

## Technology Stack

### Backend
- Ruby on Rails (API mode)
- MySQL
- JWT Authentication
- Active Record Serializers
- CORS support

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS 4
- Shadcn UI
- React Router
- React Query (TanStack Query)
- Axios

## Project Structure

```
rails-react-blog/
├── backend/           # Rails API application
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── serializers/
│   ├── config/
│   ├── db/
│   └── ...
│
├── frontend/          # React application
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── ...
│   ├── index.html
│   └── ...
│
└── docs/              # Project documentation
```

## License

MIT 