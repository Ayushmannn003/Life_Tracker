from sqlalchemy import Column, Integer, String, Float, Date, JSON, Boolean
from core.database import Base  # Ensure this matches where your declarative_base() is initialized

class Course(Base):
    __tablename__ = "academics_courses"

    id = Column(Integer, primary_key=True, index=True)
    course_code = Column(String, index=True, unique=True)
    course_name = Column(String, nullable=False)
    professor = Column(String)
    credits = Column(Integer, default=3)
    
    # Attendance Tracking
    attended_classes = Column(Integer, default=0)
    total_classes = Column(Integer, default=0)
    minimum_required = Column(Float, default=75.0) # e.g., 75%
    
    color_theme = Column(String, default="accentBlue")


class Deadline(Base):
    __tablename__ = "academics_deadlines"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    task_type = Column(String) # e.g., "Seminar", "Lab Record", "Assignment"
    course_code = Column(String, index=True) 
    
    due_date = Column(Date, nullable=False)
    urgency = Column(String, default="Medium") # "High", "Medium", "Low"
    status = Column(String, default="pending") # "pending", "completed"


class Project(Base):
    __tablename__ = "academics_projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    
    # SQLAlchemy JSON type handles arrays (e.g., ["React", "Node.js"]) smoothly
    tech_stack = Column(JSON, default=list) 
    
    stage = Column(String, default="Ideation") # "Ideation", "Development", "Testing", "Deployed"
    repo_link = Column(String)
    deadline = Column(Date)