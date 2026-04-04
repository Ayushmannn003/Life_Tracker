from sqlalchemy.orm import Session
from sqlalchemy import extract
from core import models
from features.calendar import schemas

def create_calendar_event(db: Session, event: schemas.CalendarEventCreate):
    """Saves a new calendar event to the database."""
    db_event = models.CalendarEvent(
        title=event.title,
        description=event.description,
        start_time=event.start_time,
        end_time=event.end_time,
        event_type=event.event_type
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events_for_month(db: Session, year: int, month: int):
    """Retrieves all events that occur within a specific month and year."""
    return db.query(models.CalendarEvent).filter(
        extract('year', models.CalendarEvent.start_time) == year,
        extract('month', models.CalendarEvent.start_time) == month
    ).order_by(models.CalendarEvent.start_time).all()