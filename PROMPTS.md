# PROMPT.md

## Project Overview

This project is a Car Dealership Inventory System built as part of the Incubyte Campus Hiring Assessment.

The application provides:

- User Authentication (JWT)
- Role-based Authorization (Admin and Customer)
- Vehicle Inventory Management
- Vehicle Search and Filtering
- Purchase and Restock Operations
- Responsive React Frontend
- FastAPI REST Backend
- SQLite Database using SQLAlchemy ORM

---

## AI Usage Disclosure

AI tools were used as a development assistant throughout this project.

The assistance included:

- Explaining FastAPI and SQLAlchemy concepts
- Debugging runtime errors
- Suggesting project structure improvements
- Generating boilerplate code for repetitive CRUD operations
- Helping configure JWT authentication
- Assisting with React component structure
- Troubleshooting deployment issues on Render and Vercel
- Reviewing code and suggesting improvements

Every AI-generated suggestion was manually reviewed, modified when necessary, integrated into the project, and tested before being committed.

---

## Prompts Used During Development

Some representative prompts used while developing the project include:

### Backend

- Create a FastAPI project structure following best practices.
- Implement JWT authentication using OAuth2PasswordBearer.
- Create SQLAlchemy models for User and Vehicle.
- Implement CRUD APIs for vehicle management.
- Add role-based authorization for admin users.
- Implement purchase and restock endpoints.
- Add search and filtering functionality.
- Help debug SQLAlchemy relationship issues.
- Fix FastAPI dependency injection errors.
- Explain validation errors and improve Pydantic schemas.

### Frontend

- Create a React application using Vite.
- Build reusable React components using Tailwind CSS.
- Implement Login and Registration pages.
- Create a Dashboard to display vehicle inventory.
- Connect frontend with FastAPI using Axios.
- Add JWT token handling using Axios interceptors.
- Implement protected routes.
- Improve UI responsiveness.
- Debug React routing issues.
- Fix API integration errors.

### Deployment

- Deploy FastAPI backend on Render.
- Configure production environment variables.
- Deploy React frontend on Vercel.
- Resolve deployment and import issues.
- Configure CORS for production.

---

## Manual Development

The following work was completed manually:

- Understanding project requirements
- Designing API flow
- Database schema decisions
- Integrating backend and frontend
- Testing endpoints
- Debugging application logic
- Reviewing AI-generated code
- Git commits and version control
- Deployment verification
- Final testing

---

## Technologies Used

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Deployment

- Render (Backend)
- Vercel (Frontend)

---

## Testing

The application was manually tested for:

- User Registration
- User Login
- JWT Authentication
- Vehicle CRUD Operations
- Vehicle Search
- Purchase Vehicles
- Restock Vehicles
- Authorization Rules
- Frontend Integration
- API Connectivity

---

## Notes

AI was used as a programming assistant for guidance, explanations, debugging, and boilerplate generation. Final implementation decisions, testing, integration, debugging, and deployment were performed manually.