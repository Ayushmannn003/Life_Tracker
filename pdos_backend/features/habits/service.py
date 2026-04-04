from sqlalchemy.orm import Session
from datetime import date, timedelta
from core import models
from features.habits import schemas

def create_habit(db: Session, habit: schemas.HabitCreate):
    """Adds a new custom habit to the database."""
    db_habit = models.HabitDefinition(
        name=habit.name,
        icon=habit.icon,
        goal_days_per_week=habit.goal_days_per_week
    )
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

def log_habit_completion(db: Session, habit_id: int, log_date: date):
    """Logs that a habit was completed on a specific day."""
    existing = db.query(models.HabitLog).filter(
        models.HabitLog.habit_id == habit_id,
        models.HabitLog.completed_at == log_date
    ).first()
    
    if not existing:
        new_log = models.HabitLog(habit_id=habit_id, completed_at=log_date)
        db.add(new_log)
        db.commit()
        return True
    return False

def get_habit_stats(db: Session, habit_id: int):
    """Calculates the current streak for a habit."""
    logs = db.query(models.HabitLog).filter(
        models.HabitLog.habit_id == habit_id
    ).order_by(models.HabitLog.completed_at.desc()).all()
    
    streak = 0
    today = date.today()
    for i, log in enumerate(logs):
        if log.completed_at == today - timedelta(days=i):
            streak += 1
        else:
            break
    return streak