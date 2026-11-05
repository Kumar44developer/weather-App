from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from .api import api_router
from .core.config import settings     
from .db.base import Base
from .db.session import engine


def create_app() -> FastAPI:
  app = FastAPI(
    title=settings.app_name,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
  )

  Base.metadata.create_all(bind=engine)

  app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
