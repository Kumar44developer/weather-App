from pydantic import BaseModel

class WeatherQuestionRequest(BaseModel):
    """
    Schema for Weather AI question request.
    """
    question: str
