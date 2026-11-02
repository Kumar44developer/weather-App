from functools import lru_cache
import os
from typing import List


from dotenv import load_dotenv
from pydantic import AnyHttpUrl, BaseModel, field_validator
