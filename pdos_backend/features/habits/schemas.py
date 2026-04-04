from pydantic import BaseModel
from typing import Optional
from datetime import date

class HabitBase(BaseModel):
    name: str
    icon: Optional[str] = "check_circle"
    goal_days_per_week: int = 7

class HabitCreate(HabitBase):
    pass

class HabitResponse(HabitBase):
    id: int
    streak: int = 0
    completion_rate: float = 0.0

    class Config:
        from_attributes = True

class HabitLogCreate(BaseModel):
    habit_id: int
    completed_at: date