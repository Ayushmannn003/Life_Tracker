from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db

# Explicit imports to prevent circular dependency bugs
from features.calendar.schemas import CalendarEventCreate, CalendarEventResponse
from features.calendar.service import create_calendar_event, get_events_for_month

router = APIRouter()

@router.post("/", response_model=CalendarEventResponse)
def add_event(event: CalendarEventCreate, db: Session = Depends(get_db)):
    """Create a new calendar event or objective."""
    return create_calendar_event(db=db, event=event)

@router.get("/{year}/{month}", response_model=List[CalendarEventResponse])
def get_monthly_events(year: int, month: int, db: Session = Depends(get_db)):
    """Get all calendar events for a specific year and month (e.g., 2026/04)."""
    return get_events_for_month(db=db, year=year, month=month)