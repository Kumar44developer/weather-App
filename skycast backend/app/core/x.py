from typing import Optional

from fastapi import HTTPException, status
from openai import OpenAI

from app.core.config import settings
