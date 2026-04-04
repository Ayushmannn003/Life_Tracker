from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from core.database import get_db
from features.planner import schemas, service

router = APIRouter()

@router.post("/", response_model=schemas.PlannerBlockResponse)
def add_block(block: schemas.PlannerBlockCreate, db: Session = Depends(get_db)):
    """Create a new time block in the planner."""
    return service.create_planner_block(db=db, block=block)

@router.get("/", response_model=List[schemas.PlannerBlockResponse])
def get_planner(db: Session = Depends(get_db)):
    """Get the full timeline for today."""
    return service.get_today_planner(db=db)