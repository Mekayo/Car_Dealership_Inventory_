from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.app.core.config import settings
from backend.app.core.database import init_db
from backend.app.api import api_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield

#fastapi initialization
app = FastAPI(title=settings.app_name, version="0.1.0", lifespan=lifespan)
app.include_router(api_router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

