# Car Dealership Inventory

A full-stack car dealership inventory application with:
- FastAPI backend and SQLite database
- React + Vite frontend with Tailwind CSS
- JWT authentication and role-based access control
- Vehicle CRUD, filtering, purchase, and restocking workflows

Live demo: [Car Dealership Inventory](https://car-dealership-inventory-five.vercel.app/login)

## Features

- User registration and login with JWT tokens
- Admin and customer roles
- Create, update, delete, and list vehicles
- Search and filter inventory by make, model, category, price range
- Purchase vehicles and reduce stock quantity
- Restock vehicles for admin users
- Frontend dashboard with responsive UI and confirmations

## Tech stack

- Backend: Python, FastAPI, SQLAlchemy, Pydantic, SQLite
- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Authentication: OAuth2 password flow with JWT

## Getting started

### 1. Clone the repository

```powershell
git clone <repo-url>
cd Car_Dealership_Inventory_
```

### 2. Backend setup

From the repository root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
copy backend\.env.example backend\.env
```

Then open `backend\.env` and adjust values as needed. The default config uses SQLite:

```text
DATABASE_URL=sqlite:///./dealership.db
SECRET_KEY=change-me-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### 3. Frontend setup

```powershell
cd frontend
npm install
```

## Running the application

### Backend

Run the backend from the `backend` folder:

```powershell
cd backend
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://127.0.0.1:8000`.

- Swagger UI: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/health`

### Frontend

From the `frontend` folder:

```powershell
npm run dev
```

Open the app in the browser at the local Vite URL (typically `http://127.0.0.1:5173`).

## Application usage

1. Register a user.
2. Log in to receive an access token.
3. Use the dashboard to view and filter vehicles.
4. Customers can purchase vehicles and reduce inventory.
5. Admin users can add, edit, delete, and restock vehicles.

### Default role behavior

- `customer`: can log in and purchase vehicles
- `admin`: can create, edit, delete, and restock inventory

## API endpoints

### Authentication
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — authenticate and receive a JWT token

### Vehicles
- `GET /api/vehicles` — list vehicles
- `GET /api/vehicles/{vehicle_id}` — get vehicle details
- `POST /api/vehicles` — create a new vehicle (admin only)
- `PUT /api/vehicles/{vehicle_id}` — update a vehicle (admin only)
- `DELETE /api/vehicles/{vehicle_id}` — delete a vehicle (admin only)

### Inventory actions
- `POST /api/inventory/{vehicle_id}/purchase` — purchase a vehicle
- `POST /api/inventory/{vehicle_id}/restock` — restock inventory (admin only)

## Testing

Run backend tests from the repository root:

```powershell
pytest -q
```

## Project structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/           # FastAPI routers
│   │   ├── core/          # configuration, database, security
│   │   ├── model/         # SQLAlchemy models
│   │   ├── schemas/       # Pydantic request/response schemas
│   │   └── tests/         # backend tests
│   ├── requirements.txt
│   └── .env.example
├── frontend/             # React frontend app
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Notes

- The frontend uses `http://127.0.0.1:8000/api` as the default API base URL.
- If you change backend ports or host settings, update `frontend/src/services/api.js` or set `VITE_API_BASE_URL`.
- The SQLite database file is created automatically when the backend starts.
