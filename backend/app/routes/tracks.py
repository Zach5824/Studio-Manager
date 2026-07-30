from fastapi import APIRouter

router = APIRouter(prefix="/tracks", tags=["tracks"])

@router.get("/health")
def tracks_health():
    return {"message": "tracks router running"}
