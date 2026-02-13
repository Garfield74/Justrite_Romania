#!/usr/bin/env python3

import requests
import sys
from datetime import datetime

class BackendTester:
    def __init__(self):
        # Test both the Render backend and Netlify endpoints
        self.render_backend_url = "https://justrite-romania-4295.onrender.com"
        self.netlify_frontend_url = "https://justriteromania.netlify.app"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, url, expected_status, data=None, headers=None, check_cors=False):
        """Run a single API test"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if headers is None:
                headers = {'Content-Type': 'application/json'}
            
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'OPTIONS':
                response = requests.options(url, headers=headers)

            success = response.status_code == expected_status
            
            print(f"   Status: {response.status_code} (expected {expected_status})")
            
            # Check CORS headers if requested
            if check_cors:
                cors_origin = response.headers.get('Access-Control-Allow-Origin', 'Not set')
                print(f"   CORS Origin: {cors_origin}")
                
                # Check if CORS is properly restricted
                if cors_origin == '*':
                    print(f"   ⚠️  CORS allows all origins (should be restricted to Netlify)")
                elif cors_origin == self.netlify_frontend_url:
                    print(f"   ✅ CORS properly restricted to Netlify domain")
                else:
                    print(f"   ❓ CORS set to: {cors_origin}")

            if success:
                self.tests_passed += 1
                print(f"✅ Passed")
                try:
                    response_data = response.json()
                    print(f"   Response: {response_data}")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, None

    def test_render_backend_health(self):
        """Test the Render backend health endpoint"""
        return self.run_test(
            "Render Backend Health",
            "GET",
            f"{self.render_backend_url}/api/health",
            200,
            check_cors=True
        )

    def test_netlify_api_health(self):
        """Test health endpoint through Netlify redirect"""
        return self.run_test(
            "Netlify API Health (via redirect)",
            "GET",
            f"{self.netlify_frontend_url}/api/health",
            200,
            check_cors=True
        )

    def test_cors_preflight(self):
        """Test CORS preflight request"""
        headers = {
            'Origin': self.netlify_frontend_url,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        return self.run_test(
            "CORS Preflight Request",
            "OPTIONS",
            f"{self.render_backend_url}/api/contact",
            200,
            headers=headers,
            check_cors=True
        )

    def test_contact_api(self):
        """Test contact API endpoint"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test message"
        }
        
        return self.run_test(
            "Contact API",
            "POST",
            f"{self.render_backend_url}/api/contact",
            200,
            data=test_data,
            check_cors=True
        )

    def test_survey_api(self):
        """Test survey API endpoint"""
        test_data = {
            "userType": "end-user",
            "firstName": "Test",
            "lastName": "User",
            "company": "Test Company",
            "email": "test@example.com",
            "postalCode": "12345",
            "phone": "+1234567890",
            "agreePrivacy": "yes"
        }
        
        return self.run_test(
            "Survey API",
            "POST",
            f"{self.render_backend_url}/api/survey",
            200,
            data=test_data,
            check_cors=True
        )

def main():
    print("🚀 Starting Backend API Tests")
    print("=" * 50)
    
    tester = BackendTester()
    
    # Test Render backend endpoints
    print("\n📡 Testing Render Backend Endpoints")
    print("-" * 40)
    
    tester.test_render_backend_health()
    tester.test_cors_preflight()
    tester.test_contact_api()
    tester.test_survey_api()
    
    # Test Netlify redirects
    print("\n🌐 Testing Netlify Redirects")
    print("-" * 40)
    
    tester.test_netlify_api_health()
    
    # Print results
    print(f"\n📊 Test Results")
    print("=" * 50)
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())