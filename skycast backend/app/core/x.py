from typing import Optional

from fastapi import HTTPException, status
from openai import OpenAI

from app.core.config import settings

def get_openai_client() -> OpenAI:
  """
  Create an OpenAI client using the API key from settings.
  """
