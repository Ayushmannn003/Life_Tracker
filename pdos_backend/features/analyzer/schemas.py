from pydantic import BaseModel
from typing import List, Dict

class WeeklyStats(BaseModel):
    focus_score: int
    focus_change_percent: int  # e.g., +12%
    habit_completion_rate: float
    sleep_average: float
    budget_usage_percent: float
    productivity_trend: List[float] # Data for the "Steady Ascent" wave chart
    category_distribution: Dict[str, float] # For the Financial Flow pie chart

class AnalyzerInsight(BaseModel):
    message: str
    type: str # "improvement", "warning", "neutral"