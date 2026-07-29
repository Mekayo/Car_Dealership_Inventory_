from fastapi import APIRouter

from . import auth, inventory, vehicles

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
api_router.include_router(inventory.router, prefix="/vehicles", tags=["inventory"])
