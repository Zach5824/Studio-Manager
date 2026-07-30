import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import auth, admin, tracks, interactions

# Initialize tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Studio Manager API", version="1.0.0")

# Comma-separated origins, e.g. https://studio-manager-web.vercel.app.
# Keep the local Vite address available when no production value is configured.
allowed_origins = os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach Routes
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(tracks.router)
app.include_router(interactions.router)

@app.get("/")
def root():
    return {"message": "Studio Manager API is running..."}
