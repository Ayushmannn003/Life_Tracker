from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import datetime

# Import our database configuration and models
from core.config import settings
from core.database import engine, get_db
from core import models

# 1. Import all Routers CORRECTLY (Pulling the APIRouter object out of the router.py files)
from features.budget.router import router as budget_router
from features.todo.router import router as todo_router
from features.health.router import router as health_router
from features.planner.router import router as planner_router
from features.analyzer.router import router as analyzer_router
from features.sleep.router import router as sleep_router
from features.habits.router import router as habits_router
from features.calendar.router import router as calendar_router

# Initialize the SQLite database tables
models.Base.metadata.create_all(bind=engine)

# 2. Initialize the FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
    version=settings.PROJECT_VERSION
)

# 3. Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows your local HTML frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Register all Endpoints
app.include_router(budget_router, prefix="/api/v1/budget", tags=["Budget"])
app.include_router(todo_router, prefix="/api/v1/todo", tags=["To-Do"])
app.include_router(health_router, prefix="/api/v1/health", tags=["Health"])
app.include_router(planner_router, prefix="/api/v1/planner", tags=["Planner"])
app.include_router(analyzer_router, prefix="/api/v1/analyzer", tags=["Analyzer"])
app.include_router(sleep_router, prefix="/api/v1/sleep", tags=["Sleep"])
app.include_router(habits_router, prefix="/api/v1/habits", tags=["Habits"])
app.include_router(calendar_router, prefix="/api/v1/calendar", tags=["Calendar"])

# --- Core Endpoints ---

@app.get("/")
def read_root():
    """Health check endpoint to verify the server is running."""
    return {"status": "online", "message": "PDOS Python Engine is active."}

@app.post("/api/v1/daily-log/today")
def get_or_create_daily_log(db: Session = Depends(get_db)):
    """Fetches today's DailyLog. If it doesn't exist, it creates it automatically."""
    today = datetime.date.today()
    log = db.query(models.DailyLog).filter(models.DailyLog.date == today).first()
    
    if not log:
        log = models.DailyLog(date=today)
        db.add(log)
        db.commit()
        db.refresh(log)
        
    return {
        "id": log.id,
        "date": log.date,
        "message": "Daily log synchronized."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)