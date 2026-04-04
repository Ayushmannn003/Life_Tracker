from sqlalchemy.orm import Session
import datetime
from core import models
from features.todo import schemas

def get_or_create_today_log(db: Session):
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    if not log:
        log = models.DailyLog(date=today)
        db.add(log)
        db.commit()
        db.refresh(log)
    return log

def create_task(db: Session, task: schemas.TaskCreate):
    log = get_or_create_today_log(db)
    db_task = models.TaskItem(
        daily_log_id=log.id,
        title=task.title,
        priority=task.priority,
        is_completed=False
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_today_tasks(db: Session):
    log = get_or_create_today_log(db)
    return db.query(models.TaskItem).filter(models.TaskItem.daily_log_id == log.id).all()

def toggle_task_completion(db: Session, task_id: int):
    task = db.query(models.TaskItem).filter(models.TaskItem.id == task_id).first()
    if task:
        task.is_completed = not task.is_completed
        db.commit()
        db.refresh(task)
    return task