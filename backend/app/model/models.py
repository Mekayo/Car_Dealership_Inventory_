import enum

from sqlalchemy import Enum, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.core.database import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    CUSTOMER = "customer"


class VehicleCategory(str, enum.Enum):
    SEDAN = "sedan"
    SUV = "suv"
    COUPE = "coupe"
    HATCHBACK = "hatchback"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)


class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    make: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    model: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    category: Mapped[VehicleCategory] = mapped_column(Enum(VehicleCategory), nullable=False, index=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

