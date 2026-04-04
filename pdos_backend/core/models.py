import datetime
from sqlalchemy import Column, DateTime, Integer, String, Boolean, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class DailyLog(Base):
    __tablename__ = 'daily_logs'
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True, default=datetime.date.today)

    # Relationships to our other modules
    tasks = relationship("TaskItem", back_populates="daily_log")
    expenses = relationship("Expense", back_populates="daily_log")
    health_log = relationship("HealthLog", uselist=False, back_populates="daily_log")
    sleep_entries = relationship("SleepLog", back_populates="daily_log")

class TaskItem(Base):
    __tablename__ = 'task_items'
    
    id = Column(Integer, primary_key=True, index=True)
    daily_log_id = Column(Integer, ForeignKey('daily_logs.id'))
    title = Column(String, index=True)
    is_completed = Column(Boolean, default=False)
    priority = Column(String) # High, Medium, Low

    daily_log = relationship("DailyLog", back_populates="tasks")

class Expense(Base):
    __tablename__ = 'expenses'
    
    id = Column(Integer, primary_key=True, index=True)
    daily_log_id = Column(Integer, ForeignKey('daily_logs.id'))
    description = Column(String)
    amount = Column(Float)
    category = Column(String)

    daily_log = relationship("DailyLog", back_populates="expenses")

class HealthLog(Base):
    __tablename__ = 'health_logs'
    
    id = Column(Integer, primary_key=True, index=True)
    daily_log_id = Column(Integer, ForeignKey('daily_logs.id'))
    mood_score = Column(Integer) # 1-10
    water_glasses = Column(Integer)
    sleep_hours = Column(Float)

    daily_log = relationship("DailyLog", back_populates="health_log")
    
class PlannerBlock(Base):
    __tablename__ = 'planner_blocks'
    
    id = Column(Integer, primary_key=True, index=True)
    daily_log_id = Column(Integer, ForeignKey('daily_logs.id'))
    title = Column(String)
    start_time = Column(String)  # Format: "HH:MM"
    end_time = Column(String)    # Format: "HH:MM"
    category = Column(String)    # "Work", "Health", "Personal"
    is_completed = Column(Boolean, default=False)

    daily_log = relationship("DailyLog", back_populates="planner_blocks")
    
class HabitDefinition(Base):
    __tablename__ = 'habit_definitions'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    icon = Column(String)
    goal_days_per_week = Column(Integer)
    logs = relationship("HabitLog", back_populates="habit")

class HabitLog(Base):
    __tablename__ = 'habit_logs'
    id = Column(Integer, primary_key=True)
    habit_id = Column(Integer, ForeignKey('habit_definitions.id'))
    completed_at = Column(Date, default=datetime.date.today)
    habit = relationship("HabitDefinition", back_populates="logs")
    
class SleepLog(Base):
    __tablename__ = 'sleep_logs'
    
    id = Column(Integer, primary_key=True, index=True)
    daily_log_id = Column(Integer, ForeignKey('daily_logs.id'))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    quality_score = Column(Integer)
    sleep_type = Column(String)
    duration_hours = Column(Float) # Added this

    daily_log = relationship("DailyLog", back_populates="sleep_entries")

class CalendarEvent(Base):
    __tablename__ = 'calendar_events'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    event_type = Column(String)  # e.g., "Objective", "Meeting", "Focus Block"