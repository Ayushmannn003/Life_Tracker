import os

class Settings:
    # App Meta
    PROJECT_NAME: str = "The Curator PDOS"
    PROJECT_VERSION: str = "1.0.0"
    DESCRIPTION: str = "Personal Data Operating System Backend"
    
    # Database Settings
    # This looks for an environment variable first, and defaults to our local SQLite if not found.
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./pdos_local.db")
    
    # Future-proofing: Google Drive Sync Credentials (We will use this later!)
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    
# We create a single instance of this class to use throughout the app
settings = Settings()