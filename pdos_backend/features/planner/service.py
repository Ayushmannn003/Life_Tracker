from sqlalchemy.orm import Session
import datetime
from core import models
from features.planner import schemas # We will create this next

def create_planner_block(db: Session, block: schemas.PlannerBlockCreate):
    # Ensure today's log exists
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    if not log:
        log = models.DailyLog(date=today)
        db.add(log)
        db.commit()
        db.refresh(log)

    db_block = models.PlannerBlock(
        daily_log_id=log.id,
        title=block.title,
        start_time=block.start_time,
        end_time=block.end_time,
        category=block.category
    )
    db.add(db_block)
    db.commit()
    db.refresh(db_block)
    return db_block

def get_today_planner(db: Session):
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    if not log:
        return []
    # Sort by start time for the timeline view
    return db.query(models.PlannerBlock).filter(
        models.PlannerBlock.daily_log_id == log.id
    ).order_by(models.PlannerBlock.start_time).all()