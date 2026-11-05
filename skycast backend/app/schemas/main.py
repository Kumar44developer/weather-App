from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from .api import api_router
from .core.config import settings     
