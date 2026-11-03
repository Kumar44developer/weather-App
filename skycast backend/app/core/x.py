from typing import Optional

from fastapi import HTTPException, status
from openai import OpenAI

from app.core.config import settings

def get_openai_client() -> OpenAI:
  """
  Create an OpenAI client using the API key from settings.
  """
  if not settings.openai_api_key:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="OpenAI API key is not configured on the server",
    )
