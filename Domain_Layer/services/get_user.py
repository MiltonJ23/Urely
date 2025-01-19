from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker

# Database setup
DATABASE_URL = "sqlite+aiosqlite:///../../DataLayer/db.sqlite3"  # Adjust this to your DB URL (SQLite for example)

engine = create_async_engine(DATABASE_URL, echo=True)
Base = declarative_base()

# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    gender = Column(String)
    phone = Column(String)
    age = Column(Integer)

# Pydantic model for user response
class UserResponse(BaseModel):
    id: int
    full_name: str
    gender: str
    phone: str
    age: int

    class Config:
        orm_mode = True

# Dependency to get the database session
async def get_db() -> AsyncSession:
    async with sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)() as session:
        yield session

# FastAPI app
app = FastAPI()

@app.get("/api/user/{user_id}", response_model=UserResponse)
async def get_user_details(user_id: int, db: AsyncSession = Depends(get_db)):
    async with db() as session:
        # Query the database to fetch the user with the given user_id
        result = await session.execute(select(User).filter(User.id == user_id))
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user

# Run FastAPI app (run with uvicorn)
