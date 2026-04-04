from pydantic import BaseModel
from typing import Optional

class PlannerBlockBase(BaseModel):
    title: str
    start_time: str
    end_time: str
    category: str

class PlannerBlockCreate(PlannerBlockBase):
    pass

class PlannerBlockResponse(PlannerBlockBase):
    id: int
    daily_log_id: int
    is_completed: bool

    class Config:
        from_attributes = True