from typing import Optional
from pydantic import BaseModel, Field

class UserPrompt(BaseModel):
    """User prompt question structure

    Args:
        BaseModel (BaseModel): Base model validations
    """
    mainPrompt: str = Field(..., description="The main prompt is required")
    filters: Optional[dict|list] = Field(None, description="The filter typs should be a dictionary or a list")


class AiResponse(BaseModel):
    """The formatted AI response

    Args:
        BaseModel (BaseModel): Base model validations
    """
    role: str
    content: str