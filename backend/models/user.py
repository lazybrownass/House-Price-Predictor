from sqlalchemy import Column, Integer, String, DateTime, Boolean, JSON, Float, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    # Relationships
    predictions = relationship("PredictionHistory", back_populates="user")
    favorites = relationship("FavoritePrediction", back_populates="user")

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    prediction_data = Column(JSON)  # Store input features
    predicted_price = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(String, nullable=True)

    # Relationships
    user = relationship("User", back_populates="predictions")
    favorites = relationship("FavoritePrediction", back_populates="prediction")


class FavoritePrediction(Base):
    __tablename__ = "favorite_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    prediction_id = Column(Integer, ForeignKey("prediction_history.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(String, nullable=True)

    # Relationships
    user = relationship("User", back_populates="favorites")
    prediction = relationship("PredictionHistory", back_populates="favorites")
