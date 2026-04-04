from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db

# Explicit imports to completely avoid circular import errors
from features.habits.schemas import HabitCreate, HabitResponse, HabitLogCreate
from features.habits.service import create_habit, log_habit_completion

router = APIRouter()

@router.post("/", response_model=HabitResponse)
def add_habit(habit: HabitCreate, db: Session = Depends(get_db)):
    """Create a new habit to track."""
    return create_habit(db=db, habit=habit)

@router.post("/log")
def log_completion(log_data: HabitLogCreate, db: Session = Depends(get_db)):
    """Log a habit as completed for a specific date."""
    success = log_habit_completion(
        db=db, 
        habit_id=log_data.habit_id, 
        log_date=log_data.completed_at
    )
    if not success:
        return {"message": "Habit already logged for this date."}
    return {"status": "success"}