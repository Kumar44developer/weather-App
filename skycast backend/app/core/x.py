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

  return OpenAI(api_key=settings.openai_api_key)

async def ask_llm(prompt: str, system_prompt: Optional[str] = None) -> str:
  """
  Simple helper to ask the configured LLM a question and get a text response.
  Uses the model defined in settings.openai_model.
  """
