from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import date

# ==========================================
# COURSE SCHEMAS
# ==========================================
class CourseBase(BaseModel):
    course_code: str = Field(..., example="CS401")
    course_name: str = Field(..., example="Information Retrieval Systems")
    professor: Optional[str] = None
    credits: int = 3
    attended_classes: int = 0
    total_classes: int = 0
    minimum_required: float = 75.0
    color_theme: str = "accentBlue"

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# DEADLINE SCHEMAS
# ==========================================
class DeadlineBase(BaseModel):
    title: str = Field(..., example="SLR Report")
    task_type: Optional[str] = Field(None, example="Seminar")
    course_code: Optional[str] = Field(None, example="CS401")
    due_date: date
    urgency: str = Field(default="Medium", example="High")
    status: str = Field(default="pending", example="pending")

class DeadlineCreate(DeadlineBase):
    pass

class DeadlineResponse(DeadlineBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# PROJECT SCHEMAS
# ==========================================
class ProjectBase(BaseModel):
    title: str = Field(..., example="Smart Personal Finance Tracker")
    description: Optional[str] = None
    tech_stack: List[str] = Field(default_factory=list, example=["React", "Node.js"])
    stage: str = Field(default="Ideation", example="Development")
    repo_link: Optional[str] = None
    deadline: Optional[date] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)