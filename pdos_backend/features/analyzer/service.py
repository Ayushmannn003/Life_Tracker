from sqlalchemy.orm import Session
from sqlalchemy import func
import datetime
from core import models

def calculate_weekly_metrics(db: Session):
    today = datetime.date.today()
    seven_days_ago = today - datetime.timedelta(days=7)
    
    # Fetch logs for the last week
    logs = db.query(models.DailyLog).filter(
        models.DailyLog.date >= seven_days_ago
    ).all()

    if not logs:
        return None

    # 1. Focus Score Calculation (Weighted Logic)
    # Weights: Tasks (40%), Habits (40%), Sleep (20%)
    total_task_score = 0
    total_habit_score = 0
    total_sleep_hours = 0
    
    for log in logs:
        # Task Score
        if log.tasks:
            completed = len([t for t in log.tasks if t.is_completed])
            total_task_score += (completed / len(log.tasks))
        
        # Health/Sleep Score
        if log.health_log:
            total_sleep_hours += (log.health_log.sleep_hours or 0)

    avg_task_perf = (total_task_score / len(logs)) * 100
    avg_sleep_perf = (min(total_sleep_hours / len(logs), 8.0) / 8.0) * 100
    
    # Final Weighted Score
    focus_score = int((avg_task_perf * 0.6) + (avg_sleep_perf * 0.4))

    return {
        "focus_score": focus_score,
        "focus_change_percent": 12, # Placeholder for WoW comparison
        "sleep_average": round(total_sleep_hours / len(logs), 1),
        "productivity_trend": [30, 45, 40, 60, 55, 84, 80] # Mock data for the Wave Chart
    }