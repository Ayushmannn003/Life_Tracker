from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db
from features.budget import schemas, service

router = APIRouter()

@router.post("/expense", response_model=schemas.ExpenseResponse)
def log_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    """Log a new expense into today's financial flow."""
    return service.create_expense(db=db, expense=expense)

@router.get("/expenses", response_model=List[schemas.ExpenseResponse])
def get_todays_expenses(db: Session = Depends(get_db)):
    """Retrieve all financial transactions logged today."""
    return service.get_today_expenses(db=db)