from sqlalchemy.orm import Session
import datetime
from core import models
from features.sleep import schemas

def get_or_create_today_log(db: Session):
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    if not log:
        log = models.DailyLog(date=today)
        db.add(log)
        db.commit()
        db.refresh(log)
    return log

def log_sleep(db: Session, sleep_data: schemas.SleepEntryCreate):
    log = get_or_create_today_log(db)
    
    # Calculate duration in hours
    duration = sleep_data.end_time - sleep_data.start_time
    duration_hours = round(duration.total_seconds() / 3600, 2)
    
    db_sleep = models.SleepLog(
        daily_log_id=log.id,
        start_time=sleep_data.start_time,
        end_time=sleep_data.end_time,
        quality_score=sleep_data.quality_score,
        sleep_type=sleep_data.sleep_type,
        duration_hours=duration_hours
    )
    
    db.add(db_sleep)
    db.commit()
    db.refresh(db_sleep)
    return db_sleep

def get_today_sleep_logs(db: Session):
    log = get_or_create_today_log(db)
    return log.sleep_entries