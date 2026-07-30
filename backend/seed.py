from faker import Faker
import random
from app.database import SessionLocal, engine, Base
from app.models import User, UserRole, FAQ
from app.models_domain import Track, Reply
from app.auth import hash_password

fake = Faker()

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    print("🌱 Seeding Database...")

    # Seed Admin User
    admin = User(
        username="admin",
        email="admin@studio.com",
        password_hash=hash_password("admin123"),
        role=UserRole.admin
    )
    db.add(admin)

    # Seed Producer Users
    producers = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=hash_password("password123"),
            role=UserRole.producer
        )
        db.add(user)
        producers.append(user)

    db.commit()

    # Seed Tracks
    genres = ["Hip Hop", "House", "Techno", "Trap", "R&B"]
    keys = ["C Min", "A Min", "F# Maj", "G Min", "D Maj"]
    
    tracks = []
    for i in range(10):
        track = Track(
            user_id=random.choice(producers).id,
            title=f"{fake.word().capitalize()} Session",
            genre=random.choice(genres),
            bpm=random.randint(80, 150),
            musical_key=random.choice(keys),
            technical_challenge=fake.sentence()
        )
        db.add(track)
        tracks.append(track)

    db.commit()

    # Seed Replies
    for track in tracks:
        for _ in range(2):
            reply = Reply(
                track_id=track.id,
                user_id=random.choice(producers).id,
                content=fake.paragraph(),
                votes_count=random.randint(0, 10)
            )
            db.add(reply)

    db.commit()
    db.close()
    print("✅ Database successfully seeded!")

if __name__ == "__main__":
    seed_database()