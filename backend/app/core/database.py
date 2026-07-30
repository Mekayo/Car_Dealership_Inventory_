from collections.abc import Generator
import importlib.util
from pathlib import Path


def _load_settings():
    """Load `settings` from the package or directly from the sibling file.

    Tries (in order): relative package import, absolute package import,
    then loads `config.py` by file path so this module can be executed
    as a script.
    """
    try:
        from .config import settings
        return settings
    except Exception:
        try:
            from backend.app.core.config import settings
            return settings
        except Exception:
            config_path = Path(__file__).resolve().parent / "config.py"
            spec = importlib.util.spec_from_file_location("backend_app_core_config", str(config_path))
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            return module.settings


settings = _load_settings()

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
print(settings.database_url)
engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    from ..model import models  # noqa: F401

    Base.metadata.create_all(bind=engine)