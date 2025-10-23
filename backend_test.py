#!/usr/bin/env python3
"""
Backend API Testing for PT Navodaya Multi Solusi Portfolio
Tests all public and admin endpoints as specified in the review request.
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
        
    def add_pass(self, test_name):
        self.passed += 1
        print(f"✅ PASS: {test_name}")
        
    def add_fail(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ FAIL: {test_name} - {error}")
        
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {total}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed/total*100):.1f}%" if total > 0 else "No tests run")
        
        if self.errors:
            print(f"\n{'='*60}")
            print("FAILED TESTS:")
            print(f"{'='*60}")
            for error in self.errors:
                print(f"❌ {error}")
        
        return self.failed == 0

def test_public_endpoints():
    """Test all public endpoints that don't require authentication"""
    results = TestResults()
    
    print(f"\n{'='*60}")
    print("TESTING PUBLIC ENDPOINTS")
    print(f"{'='*60}")
    print(f"Backend URL: {BASE_URL}")
    print(f"API URL: {API_URL}")
    
    # Test 1: Root endpoint
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "PT Navodaya Multi Solusi" in data["message"]:
                results.add_pass("GET /api/ - Root endpoint")
            else:
                results.add_fail("GET /api/ - Root endpoint", f"Unexpected response: {data}")
        else:
            results.add_fail("GET /api/ - Root endpoint", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/ - Root endpoint", f"Request failed: {str(e)}")
    
    # Test 2: Company information
    try:
        response = requests.get(f"{API_URL}/company", timeout=10)
        if response.status_code == 200:
            data = response.json()
            required_fields = ["name", "tagline", "phone", "email", "address"]
            missing_fields = [field for field in required_fields if field not in data]
            if not missing_fields:
                if data["name"] == "PT Navodaya Multi Solusi":
                    results.add_pass("GET /api/company - Company information")
                else:
                    results.add_fail("GET /api/company - Company information", f"Unexpected company name: {data.get('name')}")
            else:
                results.add_fail("GET /api/company - Company information", f"Missing fields: {missing_fields}")
        else:
            results.add_fail("GET /api/company - Company information", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/company - Company information", f"Request failed: {str(e)}")
    
    # Test 3: All services
    try:
        response = requests.get(f"{API_URL}/services", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) == 3:
                service_categories = [service.get("category") for service in data]
                expected_categories = ["Technology Infrastructure", "Information & Communication Solutions", "Professional Services"]
                if all(cat in service_categories for cat in expected_categories):
                    results.add_pass("GET /api/services - All services (3 services)")
                else:
                    results.add_fail("GET /api/services - All services", f"Missing expected categories. Got: {service_categories}")
            else:
                results.add_fail("GET /api/services - All services", f"Expected 3 services, got {len(data) if isinstance(data, list) else 'non-list'}")
        else:
            results.add_fail("GET /api/services - All services", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/services - All services", f"Request failed: {str(e)}")
    
    # Test 4: Single service
    try:
        response = requests.get(f"{API_URL}/services/1", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("category") == "Technology Infrastructure" and data.get("id") == "1":
                results.add_pass("GET /api/services/1 - Single service (Technology Infrastructure)")
            else:
                results.add_fail("GET /api/services/1 - Single service", f"Unexpected service data: {data}")
        else:
            results.add_fail("GET /api/services/1 - Single service", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/services/1 - Single service", f"Request failed: {str(e)}")
    
    # Test 5: All projects
    try:
        response = requests.get(f"{API_URL}/projects", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) == 6:
                results.add_pass("GET /api/projects - All projects (6 projects)")
            else:
                results.add_fail("GET /api/projects - All projects", f"Expected 6 projects, got {len(data) if isinstance(data, list) else 'non-list'}")
        else:
            results.add_fail("GET /api/projects - All projects", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/projects - All projects", f"Request failed: {str(e)}")
    
    # Test 6: Single project
    try:
        response = requests.get(f"{API_URL}/projects/1", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("id") == "1" and "title" in data:
                results.add_pass("GET /api/projects/1 - Single project")
            else:
                results.add_fail("GET /api/projects/1 - Single project", f"Unexpected project data: {data}")
        else:
            results.add_fail("GET /api/projects/1 - Single project", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/projects/1 - Single project", f"Request failed: {str(e)}")
    
    # Test 7: Contact form submission
    try:
        contact_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "message": "This is a test message for the portfolio contact form."
        }
        response = requests.post(f"{API_URL}/contact", json=contact_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if (data.get("name") == contact_data["name"] and 
                data.get("email") == contact_data["email"] and
                data.get("message") == contact_data["message"] and
                "id" in data and "createdAt" in data):
                results.add_pass("POST /api/contact - Contact form submission")
            else:
                results.add_fail("POST /api/contact - Contact form submission", f"Unexpected response data: {data}")
        else:
            results.add_fail("POST /api/contact - Contact form submission", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("POST /api/contact - Contact form submission", f"Request failed: {str(e)}")
    
    return results

def test_admin_endpoints():
    """Test admin login and protected endpoints"""
    results = TestResults()
    
    print(f"\n{'='*60}")
    print("TESTING ADMIN ENDPOINTS")
    print(f"{'='*60}")
    
    # Test 1: Admin login
    access_token = None
    try:
        login_data = {"username": "admin", "password": "admin"}
        response = requests.post(f"{API_URL}/admin/login", json=login_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "access_token" in data and "token_type" in data and data["token_type"] == "bearer":
                access_token = data["access_token"]
                results.add_pass("POST /api/admin/login - Admin login")
            else:
                results.add_fail("POST /api/admin/login - Admin login", f"Invalid token response: {data}")
        else:
            results.add_fail("POST /api/admin/login - Admin login", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("POST /api/admin/login - Admin login", f"Request failed: {str(e)}")
    
    if not access_token:
        results.add_fail("Admin Protected Endpoints", "Cannot test protected endpoints - login failed")
        return results
    
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # Test 2: Get contact messages (protected)
    try:
        response = requests.get(f"{API_URL}/admin/messages", headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.add_pass("GET /api/admin/messages - Get contact messages")
            else:
                results.add_fail("GET /api/admin/messages - Get contact messages", f"Expected list, got: {type(data)}")
        else:
            results.add_fail("GET /api/admin/messages - Get contact messages", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("GET /api/admin/messages - Get contact messages", f"Request failed: {str(e)}")
    
    # Test 3: Update company info (protected)
    try:
        update_data = {"phone": "08111020175"}
        response = requests.put(f"{API_URL}/admin/company", json=update_data, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("phone") == "08111020175":
                results.add_pass("PUT /api/admin/company - Update company info")
            else:
                results.add_fail("PUT /api/admin/company - Update company info", f"Phone not updated correctly: {data.get('phone')}")
        else:
            results.add_fail("PUT /api/admin/company - Update company info", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        results.add_fail("PUT /api/admin/company - Update company info", f"Request failed: {str(e)}")
    
    # Test 4: Test unauthorized access (without token)
    try:
        response = requests.get(f"{API_URL}/admin/messages", timeout=10)
        if response.status_code == 401:
            results.add_pass("GET /api/admin/messages (no auth) - Unauthorized access blocked")
        else:
            results.add_fail("GET /api/admin/messages (no auth) - Unauthorized access", f"Expected 401, got {response.status_code}")
    except Exception as e:
        results.add_fail("GET /api/admin/messages (no auth) - Unauthorized access", f"Request failed: {str(e)}")
    
    # Test 5: Test invalid token
    try:
        invalid_headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{API_URL}/admin/messages", headers=invalid_headers, timeout=10)
        if response.status_code == 401:
            results.add_pass("GET /api/admin/messages (invalid token) - Invalid token blocked")
        else:
            results.add_fail("GET /api/admin/messages (invalid token) - Invalid token", f"Expected 401, got {response.status_code}")
    except Exception as e:
        results.add_fail("GET /api/admin/messages (invalid token) - Invalid token", f"Request failed: {str(e)}")
    
    return results

def main():
    """Run all backend API tests"""
    print(f"{'='*60}")
    print("PT NAVODAYA MULTI SOLUSI - BACKEND API TESTS")
    print(f"{'='*60}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Test public endpoints
    public_results = test_public_endpoints()
    
    # Test admin endpoints
    admin_results = test_admin_endpoints()
    
    # Combined results
    total_passed = public_results.passed + admin_results.passed
    total_failed = public_results.failed + admin_results.failed
    all_errors = public_results.errors + admin_results.errors
    
    print(f"\n{'='*60}")
    print("FINAL TEST SUMMARY")
    print(f"{'='*60}")
    print(f"Total Tests: {total_passed + total_failed}")
    print(f"Passed: {total_passed}")
    print(f"Failed: {total_failed}")
    print(f"Success Rate: {(total_passed/(total_passed + total_failed)*100):.1f}%" if (total_passed + total_failed) > 0 else "No tests run")
    
    if all_errors:
        print(f"\n{'='*60}")
        print("ALL FAILED TESTS:")
        print(f"{'='*60}")
        for error in all_errors:
            print(f"❌ {error}")
    
    print(f"\nTest completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Return exit code based on results
    return 0 if total_failed == 0 else 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)