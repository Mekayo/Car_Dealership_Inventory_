from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.model.models import Vehicle
from backend.app.schemas.schemas import InventoryAction, VehicleResponse
from backend.app.core.security import get_current_user, require_admin

router = APIRouter()


@router.post("/{vehicle_id}/purchase", response_model=VehicleResponse)
def purchase_vehicle(
    vehicle_id: int,
    payload: InventoryAction,
    db: Session = Depends(get_db),
    _: object = Depends(get_current_user),
) -> Vehicle:
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")
    if vehicle.quantity < payload.quantity:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough stock")

    vehicle.quantity -= payload.quantity
    db.commit()
    db.refresh(vehicle)
    return vehicle


@router.post("/{vehicle_id}/restock", response_model=VehicleResponse)
def restock_vehicle(
    vehicle_id: int,
    payload: InventoryAction, 
    db: Session = Depends(get_db),_: object = Depends(require_admin),) -> Vehicle:
    
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")

    vehicle.quantity += payload.quantity
    db.commit()
    db.refresh(vehicle)
    return vehicle
