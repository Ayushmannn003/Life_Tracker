from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from core.database import get_db
from features.sleep import schemas, service

router = APIRouter()

@router.post("/", response_model=schemas.SleepEntryResponse)
def add_sleep_log(sleep_data: schemas.SleepEntryCreate, db: Session = Depends(get_db)):
    """Add a sleep session (Nocturnal or Nap) to today's log."""
    return service.log_sleep(db=db, sleep_data=sleep_data)

@router.get("/", response_model=List[schemas.SleepEntryResponse])
def get_sleep_logs(db: Session = Depends(get_db)):
    """Retrieve all sleep entries for today."""
    return service.get_today_sleep_logs(db=db)