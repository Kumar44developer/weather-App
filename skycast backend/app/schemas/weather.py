from pydantic import BaseModel


class CurrentWeatherResponse(BaseModel):
  """
  Response schema for current weather data.
  """

  city: str
  temperature: float
  humidity: int
  wind: float
  description: str
