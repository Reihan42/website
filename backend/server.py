from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import timedelta

from models import (
    CompanyInfo, CompanyInfoUpdate,
    Service, ServiceCreate, ServiceUpdate,
    Project, ProjectCreate, ProjectUpdate,
    ContactMessage, ContactMessageCreate,
    AdminLogin, Token
)
from auth import (
    verify_password, get_password_hash, create_access_token, verify_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from seed_data import company_info_seed, services_seed, projects_seed

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Seed database on startup
@app.on_event("startup")
async def startup_db():
    try:
        # Seed admin user if not exists
        admin_user = await db.admin_users.find_one({"username": "admin"})
        if not admin_user:
            hashed_password = get_password_hash("admin")
            await db.admin_users.insert_one({
                "username": "admin",
                "hashedPassword": hashed_password
            })
            logger.info("Admin user created")
        
        # Seed company info if not exists
        company = await db.company_info.find_one()
        if not company:
            await db.company_info.insert_one(company_info_seed)
            logger.info("Company info seeded")
        
        # Seed services if not exists
        services_count = await db.services.count_documents({})
        if services_count == 0:
            await db.services.insert_many(services_seed)
            logger.info("Services seeded")
        
        # Seed projects if not exists
        projects_count = await db.projects.count_documents({})
        if projects_count == 0:
            await db.projects.insert_many(projects_seed)
            logger.info("Projects seeded")
        
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")

# ============ PUBLIC ENDPOINTS ============

@api_router.get("/")
async def root():
    return {"message": "PT Navodaya Multi Solusi API"}

@api_router.get("/company", response_model=CompanyInfo)
async def get_company_info():
    company = await db.company_info.find_one()
    if not company:
        raise HTTPException(status_code=404, detail="Company info not found")
    company.pop('_id', None)
    return company

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find().to_list(1000)
    for service in services:
        service.pop('_id', None)
    return services

@api_router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    service = await db.services.find_one({"id": service_id})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service.pop('_id', None)
    return service

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find().to_list(1000)
    for project in projects:
        project.pop('_id', None)
    return projects

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project.pop('_id', None)
    return project

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate):
    message_dict = message.dict()
    contact_msg = ContactMessage(**message_dict)
    await db.contact_messages.insert_one(contact_msg.dict())
    return contact_msg

# ============ ADMIN ENDPOINTS ============

@api_router.post("/admin/login", response_model=Token)
async def admin_login(credentials: AdminLogin):
    admin = await db.admin_users.find_one({"username": credentials.username})
    if not admin or not verify_password(credentials.password, admin["hashedPassword"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": credentials.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.put("/admin/company", response_model=CompanyInfo)
async def update_company_info(
    company_update: CompanyInfoUpdate,
    username: str = Depends(verify_token)
):
    update_data = {k: v for k, v in company_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.company_info.update_one({}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Company info not found")
    
    company = await db.company_info.find_one()
    company.pop('_id', None)
    return company

@api_router.post("/admin/services", response_model=Service)
async def create_service(
    service: ServiceCreate,
    username: str = Depends(verify_token)
):
    service_obj = Service(**service.dict())
    await db.services.insert_one(service_obj.dict())
    return service_obj

@api_router.put("/admin/services/{service_id}", response_model=Service)
async def update_service(
    service_id: str,
    service_update: ServiceUpdate,
    username: str = Depends(verify_token)
):
    update_data = {k: v for k, v in service_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.services.update_one({"id": service_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service = await db.services.find_one({"id": service_id})
    service.pop('_id', None)
    return service

@api_router.delete("/admin/services/{service_id}")
async def delete_service(
    service_id: str,
    username: str = Depends(verify_token)
):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

@api_router.post("/admin/projects", response_model=Project)
async def create_project(
    project: ProjectCreate,
    username: str = Depends(verify_token)
):
    project_obj = Project(**project.dict())
    await db.projects.insert_one(project_obj.dict())
    return project_obj

@api_router.put("/admin/projects/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    username: str = Depends(verify_token)
):
    update_data = {k: v for k, v in project_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.projects.update_one({"id": project_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project = await db.projects.find_one({"id": project_id})
    project.pop('_id', None)
    return project

@api_router.delete("/admin/projects/{project_id}")
async def delete_project(
    project_id: str,
    username: str = Depends(verify_token)
):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

@api_router.get("/admin/messages", response_model=List[ContactMessage])
async def get_contact_messages(username: str = Depends(verify_token)):
    messages = await db.contact_messages.find().sort("createdAt", -1).to_list(1000)
    for message in messages:
        message.pop('_id', None)
    return messages

@api_router.delete("/admin/messages/{message_id}")
async def delete_contact_message(
    message_id: str,
    username: str = Depends(verify_token)
):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Contact message deleted successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
