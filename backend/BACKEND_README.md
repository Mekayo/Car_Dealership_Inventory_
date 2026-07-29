# Backend – Car Dealership Inventory API

## Quick setup

From the repository root (recommended):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
copy backend\.env.example backend\.env
```

If you prefer a venv inside the `backend` folder, `cd backend` first and adjust the paths accordingly.

## Run (development)

There are two runtime layouts supported during the assessment:

- If the FastAPI app is at the repository root (current project state):

```powershell
uvicorn main:app --reload --port 8000
```

- If you run from the `backend` folder and the app is located at `backend/app/main.py`:

```powershell
cd backend
uvicorn app.main:app --reload --port 8000
```

API docs: http://127.0.0.1:8000/docs
Health check: http://127.0.0.1:8000/health

## Tests

Run tests from the repository root:

```powershell
pytest -q
```

## Project layout

Current layout used in this assessment:

```
.
├── main.py                # top-level FastAPI app (imports backend.app)
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── model/
│   │   ├── schemas/
│   │   └── tests/
│   ├── requirements.txt
│   └── .env.example
```

Notes:
- During the assessment `main.py` may live at the repository root and import `backend.app.*`. If you move the application into `backend/app/main.py`, update the run command to `uvicorn app.main:app`.
- Tests rely on Python imports resolving `backend.app.*`; running `pytest` from the repo root is recommended.

Routes talk directly to the database — no separate service layer in this kata.
