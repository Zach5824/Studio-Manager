from fastapi import APIRouter

router = APIRouter(prefix="/interactions", tags=["interactions"])

@router.get("/health")
def interactions_health():
    return {"message": "interactions router running"}
