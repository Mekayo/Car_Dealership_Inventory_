from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user, require_admin
from app.model.models import Vehicle
from app.schemas.schemas import InventoryAction, VehicleResponse

router = APIRouter()


def get_vehicle_or_404(db: Session, vehicle_id: int) -> Vehicle:
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if vehicle is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )
    return vehicle


@router.post("/{vehicle_id}/purchase", response_model=VehicleResponse)
def purchase_vehicle(
    vehicle_id: int,
    payload: InventoryAction,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_user),
) -> Vehicle:

    vehicle = get_vehicle_or_404(db, vehicle_id)

    if vehicle.quantity < payload.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough stock",
        )

    # Reduce stock after purchase
    vehicle.quantity -= payload.quantity

    db.commit()
    db.refresh(vehicle)

    return vehicle


@router.post("/{vehicle_id}/restock", response_model=VehicleResponse)
def restock_vehicle(
    vehicle_id: int,
    payload: InventoryAction,
    db: Session = Depends(get_db),
    _: object = Depends(require_admin),
) -> Vehicle:

    vehicle = get_vehicle_or_404(db, vehicle_id)

    # Increase stock after restocking
    vehicle.quantity += payload.quantity

    db.commit()
    db.refresh(vehicle)

    return vehicle