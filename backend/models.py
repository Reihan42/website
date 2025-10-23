from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Company Info Model
class CompanyInfo(BaseModel):
    name: str
    tagline: str
    subline: str
    description: str
    mission: str
    phone: str
    email: str
    address: str
    coordinates: dict
    mapLink: str
    logo: str

class CompanyInfoUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    subline: Optional[str] = None
    description: Optional[str] = None
    mission: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    coordinates: Optional[dict] = None
    mapLink: Optional[str] = None
    logo: Optional[str] = None

# Service Model
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    icon: str
    description: str
    features: List[str]
    detailedContent: Optional[str] = None

class ServiceCreate(BaseModel):
    category: str
    icon: str
    description: str
    features: List[str]
    detailedContent: Optional[str] = None

class ServiceUpdate(BaseModel):
    category: Optional[str] = None
    icon: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    detailedContent: Optional[str] = None

# Project Model
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    year: str
    image: str
    detailedContent: Optional[str] = None
    technologies: Optional[List[str]] = None

class ProjectCreate(BaseModel):
    title: str
    category: str
    description: str
    year: str
    image: str
    detailedContent: Optional[str] = None
    technologies: Optional[List[str]] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    year: Optional[str] = None
    image: Optional[str] = None
    detailedContent: Optional[str] = None
    technologies: Optional[List[str]] = None

# Contact Message Model
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    isRead: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

# Admin User Model
class AdminUser(BaseModel):
    username: str
    hashedPassword: str

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
