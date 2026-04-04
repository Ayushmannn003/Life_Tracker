from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from features.analyzer import service

router = APIRouter()

@router.get("/weekly-summary")
def get_weekly_summary(db: Session = Depends(get_db)):
    """Generates the data for the Dashboard's Weekly Performance card."""
    stats = service.calculate_weekly_metrics(db)
    if not stats:
        return {"message": "Insufficient data for analysis. Keep tracking!"}
    
    # AI Insights Logic
    insights = []
    if stats["focus_score"] > 80:
        insights.append("Your 'Steady Ascent' continues. Mid-week deep work is high.")
    
    return {
        "stats": stats,
        "insights": insights
    }