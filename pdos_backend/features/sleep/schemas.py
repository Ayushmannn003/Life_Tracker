from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SleepEntryBase(BaseModel):
    start_time: datetime
    end_time: datetime
    quality_score: int  # 1-10 scale
    sleep_type: str = "Nocturnal" # Can be "Nocturnal" or "Nap"

class SleepEntryCreate(SleepEntryBase):
    pass

class SleepEntryResponse(SleepEntryBase):
    id: int
    daily_log_id: int
    duration_hours: float

    class Config:
        from_attributes = True