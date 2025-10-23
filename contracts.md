# Backend Integration Contracts - PT Navodaya Multi Solusi Portfolio

## Overview
Complete backend system with MongoDB, FastAPI, and Admin Panel for content management.

## Mock Data Location
`/app/frontend/src/data/mock.js` - Contains all mock data that needs to be replaced with backend APIs.

## Database Models

### 1. Company Info (Single Document)
- name, tagline, subline, description, mission
- phone, email, address, coordinates, mapLink, logo

### 2. Services (Multiple Documents)
- id, category, icon, description, features[], detailedContent

### 3. Projects (Multiple Documents)
- id, title, category, description, year, image, detailedContent, technologies[]

### 4. Contact Messages (Multiple Documents)
- name, email, message, createdAt, isRead

### 5. Admin Users (For Authentication)
- username, hashedPassword

## API Endpoints

### Public Endpoints (No Auth Required)
- GET /api/company - Get company info
- GET /api/services - Get all services
- GET /api/services/{id} - Get single service
- GET /api/projects - Get all projects
- GET /api/projects/{id} - Get single project
- POST /api/contact - Submit contact form

### Admin Endpoints (Auth Required)
- POST /api/admin/login - Admin login (returns JWT token)
- PUT /api/admin/company - Update company info
- POST /api/admin/services - Create service
- PUT /api/admin/services/{id} - Update service
- DELETE /api/admin/services/{id} - Delete service
- POST /api/admin/projects - Create project
- PUT /api/admin/projects/{id} - Update project
- DELETE /api/admin/projects/{id} - Delete project
- GET /api/admin/messages - Get all contact messages
- DELETE /api/admin/messages/{id} - Delete message

## Frontend Integration Plan

### Step 1: Update Logo
- Replace logo URL in mock.js with new logo

### Step 2: Add Detail Pages
- Create ServiceDetail.jsx component
- Create ProjectDetail.jsx component
- Add React Router routes for /service/:id and /project/:id

### Step 3: Replace Mock with API Calls
- Create api.js utility with axios instance
- Update all components to fetch from backend
- Add loading states and error handling

### Step 4: Build Admin Panel
- Create admin login page
- Create admin dashboard with CRUD operations
- Add authentication context
- Protected routes for admin pages

## Implementation Order
1. Backend models and public APIs
2. Seed initial data from mock.js
3. Admin authentication and protected routes
4. Frontend detail pages (service/project)
5. Frontend-backend API integration
6. Admin panel UI
7. Testing
