from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    priority: str  # e.g., "High", "Medium", "Low"

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    daily_log_id: int
    is_completed: bool

    class Config:
        from_attributes = True