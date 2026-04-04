from sqlalchemy.orm import Session
import datetime
from core import models
from features.budget import schemas

def get_or_create_today_log(db: Session):
    """Helper function to guarantee today's log exists before attaching an expense."""
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    if not log:
        log = models.DailyLog(date=today)
        db.add(log)
        db.commit()
        db.refresh(log)
    return log

def create_expense(db: Session, expense: schemas.ExpenseCreate):
    """Writes a new expense to the database under today's log."""
    log = get_or_create_today_log(db)
    
    db_expense = models.Expense(
        daily_log_id=log.id,
        description=expense.description,
        amount=expense.amount,
        category=expense.category
    )
    
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_today_expenses(db: Session):
    """Fetches all expenses logged for today."""
    log = get_or_create_today_log(db)
    return db.query(models.Expense).filter(models.Expense.daily_log_id == log.id).all()