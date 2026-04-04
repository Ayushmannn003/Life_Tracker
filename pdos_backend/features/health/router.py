from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from features.health import schemas, service

router = APIRouter()

@router.post("/", response_model=schemas.HealthLogResponse)
def update_health_log(health_data: schemas.HealthLogCreateUpdate, db: Session = Depends(get_db)):
    """Update today's health metrics. You can send just one field (e.g., water) or all of them."""
    return service.upsert_health_log(db=db, health_data=health_data)

@router.get("/", response_model=schemas.HealthLogResponse)
def get_health_log(db: Session = Depends(get_db)):
    """Get today's current health metrics."""
    log = service.get_today_health(db=db)
    if not log:
        # Return an empty schema if nothing is logged yet
        return schemas.HealthLogResponse(id=0, daily_log_id=0)
    return log