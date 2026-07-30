# Studio Manager

Studio Manager is a full-stack web application for coordinating music production work across a studio team. It combines a React frontend with a FastAPI backend so producers, collaborators, and administrators can browse tracks, manage uploads, view profiles, and interact with studio Q&A content from one place.

## Overview

Studio Manager is designed to support a modern production workflow with:

- Role-based access for producers, regular users, and administrators
- A catalog experience for browsing shared tracks and project metadata
- Upload and project-management flows for producers
- A profile experience for viewing account details and permissions
- A FastAPI backend for API-driven data access and authentication support

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React icons

### Backend
- Python 3.12+
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- PostgreSQL
- JWT/auth helpers via python-jose and passlib

## Project Structure

- backend/ – FastAPI application, SQLAlchemy models, and route modules
  - app/main.py – application entry point
  - app/database.py – database configuration and session factory
  - app/models.py, app/models_domain.py – data models
  - app/routes/ – API routers for auth, admin, tracks, and interactions
- frontend/ – React + Vite application
  - src/components/ – UI components for auth, catalog, admin, and details
  - src/pages/ – page-level views for login, home, catalog, profile, and track details
  - src/store/ – Redux slices and state management

## Prerequisites

Before getting started, make sure you have:

- Node.js and npm installed
- Python 3.12 or newer
- PostgreSQL running locally (or update the database connection string)
- Git

## Backend Setup

1. Open a terminal and move into the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install the backend dependencies:

   ```bash
   pip install fastapi uvicorn sqlalchemy python-jose[cryptography] passlib[bcrypt] python-multipart email-validator pydantic[email] psycopg2-binary
   ```

4. Set your database URL if needed:

   ```bash
   export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/studiomanager"
   ```

5. Start the backend server:

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at:
- http://localhost:8000/
- http://localhost:8000/docs for FastAPI Swagger documentation

## Frontend Setup

1. Open a second terminal and move into the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev -- --host 0.0.0.0
   ```

The frontend will be available at:
- http://localhost:5173/

## Development Notes

- The frontend uses Tailwind CSS for styling and Vite for fast local development.
- The backend is organized around FastAPI routers and SQLAlchemy models.
- If you want to build the frontend for production, run:

  ```bash
  cd frontend
  npm run build
  ```

## Contributing

When making changes:

1. Keep the backend and frontend updates aligned where shared behavior is involved.
2. Test the app locally before pushing changes.
3. Use clear commit messages and keep the README updated if setup or workflow changes.
