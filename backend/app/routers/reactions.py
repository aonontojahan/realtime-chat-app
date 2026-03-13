from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.reaction import ReactionCreate, ReactionResponse
from app.services.reaction_service import add_reaction, get_message_reactions

router = APIRouter(tags=["Reactions"])


@router.post("/reactions", response_model=ReactionResponse)
def react(
    reaction: ReactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return add_reaction(db, current_user.id, reaction)


@router.get("/messages/{message_id}/reactions", response_model=list[ReactionResponse])
def get_reactions(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_message_reactions(db, message_id)
