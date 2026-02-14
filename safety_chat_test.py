#!/usr/bin/env python3

import requests
import sys
import json
import uuid
from datetime import datetime

class SafetyChatTester:
    def __init__(self):
        # Use the Render backend URL directly
        self.backend_url = "https://justrite-romania-4295.onrender.com"
        self.netlify_url = "https://justriteromania.netlify.app"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, url, expected_status, data=None, headers=None):
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

            success = response.status_code == expected_status
            
            print(f"   Status: {response.status_code} (expected {expected_status})")
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed")
                try:
                    if response.headers.get('content-type', '').startswith('application/json'):
                        response_data = response.json()
                        print(f"   Response: {response_data}")
                    else:
                        # For streaming responses, just show first part
                        print(f"   Response: {response.text[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, None

    def test_safety_chat_spill_pallets(self):
        """Test safety chat with spill pallets question"""
        session_id = str(uuid.uuid4())
        test_data = {
            "session_id": session_id,
            "message": "What are spill pallets and how do they work?",
            "language": "en"
        }
        
        return self.run_test(
            "Safety Chat - Spill Pallets Question",
            "POST",
            f"{self.backend_url}/api/safety-chat",
            200,
            data=test_data
        )

    def test_safety_chat_via_netlify(self):
        """Test safety chat through Netlify redirect"""
        session_id = str(uuid.uuid4())
        test_data = {
            "session_id": session_id,
            "message": "Tell me about spill containment products",
            "language": "en"
        }
        
        return self.run_test(
            "Safety Chat via Netlify - Spill Containment",
            "POST",
            f"{self.netlify_url}/api/safety-chat",
            200,
            data=test_data
        )

    def test_safety_chat_romanian(self):
        """Test safety chat in Romanian"""
        session_id = str(uuid.uuid4())
        test_data = {
            "session_id": session_id,
            "message": "Ce sunt paletii de scurgere?",
            "language": "ro"
        }
        
        return self.run_test(
            "Safety Chat - Romanian Language",
            "POST",
            f"{self.backend_url}/api/safety-chat",
            200,
            data=test_data
        )

def main():
    print("🚀 Starting Safety Chat API Tests")
    print("=" * 50)
    
    tester = SafetyChatTester()
    
    # Test safety chat endpoints
    print("\n🤖 Testing Safety Chat Endpoints")
    print("-" * 40)
    
    tester.test_safety_chat_spill_pallets()
    tester.test_safety_chat_via_netlify()
    tester.test_safety_chat_romanian()
    
    # Print results
    print(f"\n📊 Test Results")
    print("=" * 50)
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All safety chat tests passed!")
        return 0
    else:
        print("❌ Some safety chat tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())