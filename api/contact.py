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
            required_fields = ['name', 'email', 'subject', 'message']
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

            # Log the submission (in production, you'd send to a database or email service)
            submission = {
                'type': 'contact',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'name': data['name'],
                'email': data['email'],
                'phone': data.get('phone', ''),
                'company': data.get('company', ''),
                'subject': data['subject'],
                'message': data['message']
            }
            
            # For now, just log it (Vercel logs are viewable in dashboard)
            print(f"CONTACT_SUBMISSION: {json.dumps(submission)}")

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': 'Contact form submitted successfully'
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
