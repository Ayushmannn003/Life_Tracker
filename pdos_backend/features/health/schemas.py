from pydantic import BaseModel
from typing import Optional

class HealthLogBase(BaseModel):
    mood_score: Optional[int] = None
    water_glasses: Optional[int] = None
    sleep_hours: Optional[float] = None

class HealthLogCreateUpdate(HealthLogBase):
    pass

class HealthLogResponse(HealthLogBase):
    id: int
    daily_log_id: int

    class Config:
        from_attributes = True