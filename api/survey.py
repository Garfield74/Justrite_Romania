from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime, timezone
import re

def validate_email(email):
    """Simple email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'https://justriteromania.netlify.app')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))

            # Validate required fields
            required_fields = ['userType', 'firstName', 'lastName', 'company', 'email', 'postalCode', 'phone', 'agreePrivacy']
            missing = [f for f in required_fields if not data.get(f)]
            if missing:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': f'Missing required fields: {", ".join(missing)}'
                }).encode())
                return

            # Validate email
            if not validate_email(data['email']):
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Invalid email address'
                }).encode())
                return

            # Log the submission
            submission = {
                'type': 'survey',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'userType': data['userType'],
                'firstName': data['firstName'],
                'lastName': data['lastName'],
                'company': data['company'],
                'email': data['email'],
                'postalCode': data['postalCode'],
                'phone': data['phone'],
                'additionalInfo': data.get('additionalInfo', ''),
                'agreeMarketing': data.get('agreeMarketing', False),
                'agreePrivacy': data['agreePrivacy']
            }
            
            # Log to Vercel logs
            print(f"SURVEY_SUBMISSION: {json.dumps(submission)}")

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': 'STUD-E survey submitted successfully'
            }).encode())

        except json.JSONDecodeError:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': 'Invalid JSON'
            }).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': str(e)
            }).encode())
