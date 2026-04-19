from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Import your database dependency (adjust the path if your get_db is located elsewhere)
from core.database import get_db 

# Import the models and schemas we just created
from features.academics import models, schemas

router = APIRouter(
    prefix="/api/academics",
    tags=["Academics"]
)

# ==========================================
# COURSE ENDPOINTS
# ==========================================

@router.get("/courses", response_model=List[schemas.CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    """Fetch all academic courses."""
    return db.query(models.Course).all()

@router.post("/courses", response_model=schemas.CourseResponse)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    """Add a new course to the matrix."""
    db_course = models.Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.put("/courses/{course_id}/attendance", response_model=schemas.CourseResponse)
def update_attendance(course_id: int, attended: int, total: int, db: Session = Depends(get_db)):
    """Update attendance metrics for a specific course."""
    db_course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db_course.attended_classes = attended
    db_course.total_classes = total
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    """Remove a course from the matrix."""
    db_course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(db_course)
    db.commit()
    return {"message": "Course deleted successfully"}


# ==========================================
# DEADLINE ENDPOINTS
# ==========================================

@router.get("/deadlines", response_model=List[schemas.DeadlineResponse])
def get_deadlines(db: Session = Depends(get_db)):
    """Fetch all pending and completed deadlines."""
    # Sorting by due date so the most urgent appear first
    return db.query(models.Deadline).order_by(models.Deadline.due_date).all()

@router.post("/deadlines", response_model=schemas.DeadlineResponse)
def create_deadline(deadline: schemas.DeadlineCreate, db: Session = Depends(get_db)):
    """Log a new deadline or task."""
    db_deadline = models.Deadline(**deadline.model_dump())
    db.add(db_deadline)
    db.commit()
    db.refresh(db_deadline)
    return db_deadline

@router.put("/deadlines/{deadline_id}/status", response_model=schemas.DeadlineResponse)
def update_deadline_status(deadline_id: int, status: str, db: Session = Depends(get_db)):
    """Toggle a deadline between 'pending' and 'completed'."""
    db_deadline = db.query(models.Deadline).filter(models.Deadline.id == deadline_id).first()
    if not db_deadline:
        raise HTTPException(status_code=404, detail="Deadline not found")
    
    db_deadline.status = status
    db.commit()
    db.refresh(db_deadline)
    return db_deadline

@router.delete("/deadlines/{deadline_id}")
def delete_deadline(deadline_id: int, db: Session = Depends(get_db)):
    """Delete a deadline entirely."""
    db_deadline = db.query(models.Deadline).filter(models.Deadline.id == deadline_id).first()
    if not db_deadline:
        raise HTTPException(status_code=404, detail="Deadline not found")
    db.delete(db_deadline)
    db.commit()
    return {"message": "Deadline deleted successfully"}


# ==========================================
# PROJECT ENDPOINTS
# ==========================================

@router.get("/projects", response_model=List[schemas.ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    """Fetch all engineering builds and projects."""
    return db.query(models.Project).all()

@router.post("/projects", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    """Initialize a new project."""
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/projects/{project_id}/stage", response_model=schemas.ProjectResponse)
def update_project_stage(project_id: int, stage: str, db: Session = Depends(get_db)):
    """Move a project between Ideation, Development, Testing, and Deployed."""
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_project.stage = stage
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Archive or delete a project."""
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}