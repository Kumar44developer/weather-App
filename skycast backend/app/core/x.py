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
  client = get_openai_client()

  messages = []
  if system_prompt:
    messages.append({"role": "system", "content": system_prompt})
  messages.append({"role": "user", "content": prompt})

  completion = client.chat.completions.create(
    model=settings.openai_model,
    messages=messages,
  )

  content = completion.choices[0].message.content or ""
  return content

async def get_weather_advice(
    weather_data: dict,
    user_question: str,
) -> str:
  """
  Get AI advice based on weather data and user question.

  Args:
    weather_data: Dictionary containing weather information with keys:
      - city: str
      - temperature: float (in Celsius)
      - humidity: int (percentage)
      - wind: float (wind speed in km/h)
      - description: str (weather description)
    user_question: The user's question about the weather

  Returns:
    AI-generated advice as a string
  """
