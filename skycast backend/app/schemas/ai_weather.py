from pydantic import BaseModel

class WeatherQuestionRequest(BaseModel):
    """
    Schema for Weather AI question request.
    """
    question: str

class WeatherAIRequest(BaseModel):
    """
    Schema for Weather AI request with city and question.
    """
    city: str
    question: str

class WeatherQuestionResponse(BaseModel):
    """
    Schema for Weather AI question response.
    """
    question: str
    user_id: int
    response: str
