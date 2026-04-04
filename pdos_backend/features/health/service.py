from sqlalchemy.orm import Session
import datetime
from core import models
from features.health import schemas

def get_or_create_today_log(db: Session):
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    if not log:
        log = models.DailyLog(date=today)
        db.add(log)
        db.commit()
        db.refresh(log)
    return log

def upsert_health_log(db: Session, health_data: schemas.HealthLogCreateUpdate):
    log = get_or_create_today_log(db)
    health_log = db.query(models.HealthLog).filter(models.HealthLog.daily_log_id == log.id).first()
    
    if not health_log:
        health_log = models.HealthLog(daily_log_id=log.id)
        db.add(health_log)

    # Update only the fields that were provided
    if health_data.mood_score is not None:
        health_log.mood_score = health_data.mood_score
    if health_data.water_glasses is not None:
        health_log.water_glasses = health_data.water_glasses
    if health_data.sleep_hours is not None:
        health_log.sleep_hours = health_data.sleep_hours

    db.commit()
    db.refresh(health_log)
    return health_log

def get_today_health(db: Session):
    log = get_or_create_today_log(db)
    return db.query(models.HealthLog).filter(models.HealthLog.daily_log_id == log.id).first()