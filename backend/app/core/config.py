from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Car Dealership Inventory"
    database_url: str = "sqlite:///./dev.db"
    secret_key: str = "change-me-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
