from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..auth import get_current_user
from ..database import get_db
from ..models import User, UserRole
from ..models_domain import Track
from ..schemas import TrackCreate, TrackResponse

router = APIRouter(prefix="/tracks", tags=["tracks"])

@router.get("/health")
def tracks_health():
    return {"message": "tracks router running"}


@router.get("/", response_model=list[TrackResponse])
def list_tracks(
    genre: Optional[str] = Query(default=None),
    bpm: Optional[int] = Query(default=None, ge=1),
    db: Session = Depends(get_db),
):
    query = db.query(Track)

    if genre and genre.strip():
        query = query.filter(Track.genre.ilike(f"%{genre.strip()}%"))
    if bpm is not None:
        query = query.filter(Track.bpm == bpm)

    return query.order_by(Track.created_at.desc(), Track.id.desc()).all()


@router.post("/", response_model=TrackResponse, status_code=status.HTTP_201_CREATED)
def create_track(
    track_data: TrackCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.producer:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only producers can add music",
        )

    title = track_data.title.strip()
    genre = track_data.genre.strip()
    musical_key = track_data.musical_key.strip()
    if not title or not genre or not musical_key:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Title, genre, and musical key are required",
        )

    track = Track(
        user_id=current_user.id,
        title=title,
        genre=genre,
        bpm=track_data.bpm,
        musical_key=musical_key,
        technical_challenge=(track_data.technical_challenge or "").strip() or None,
    )
    db.add(track)
    db.commit()
    db.refresh(track)
    return track
