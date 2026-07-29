# Backend – Car Dealership Inventory API

## Setup

```powershell
cd backend
python -m venv ..\.venv
..\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

## Run

From the `backend` directory:

```powershell
uvicorn app.main:app --reload
```
- The API will be available at http://
- API docs: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/health

## Tests

```powershell
pytest
```

## Project layout
- Backend Directory Structure
```
 backend/
│
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── vehicles.py
│   │   └── inventory.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   │
│   ├── models/
│   ├── schemas/ 
│   ├── tests/
│   └── main.py
│
|
├── requirements.txt
└── .env

```

Routes talk directly to the database — no separate repository or service layers.
