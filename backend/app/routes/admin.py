from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/health")
def admin_health():
    return {"message": "admin router running"}
