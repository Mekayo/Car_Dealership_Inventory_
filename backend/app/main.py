from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.config import settings
from app.database import init_db
from app.routes import api_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(title=settings.app_name, version="0.1.0", lifespan=lifespan)
app.include_router(api_router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
