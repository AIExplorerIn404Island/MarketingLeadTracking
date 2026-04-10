from sqlalchemy import Column, Integer, String, Boolean, JSON, ForeignKey, DateTime, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    leads = relationship("Lead", back_populates="owner")

class LeadSource(Base):
    __tablename__ = "lead_sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    type = Column(String, nullable=False)  # e.g., 'twitter', 'directory'

    leads = relationship("Lead", back_populates="source")

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    company = Column(String, index=True)
    role = Column(String)
    website = Column(String)
    social_links = Column(JSON)
    email = Column(String, index=True)
    location = Column(String)
    industry = Column(String)
    score = Column(Float, default=0.0)
    source_id = Column(Integer, ForeignKey("lead_sources.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    source = relationship("LeadSource", back_populates="leads")
    owner = relationship("User", back_populates="leads")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, default="pending")  # pending, running, completed, failed
    parameters = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
