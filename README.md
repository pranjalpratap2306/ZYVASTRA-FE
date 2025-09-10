now # ZYVASTRA App

## Dev servers

- Frontend (Expo):
  - cd app
  - npm run web

- Backend (optional, for auto sending SMS/Email):
  - cd server
  - npm install
  - Create `.env`:
```
PORT=4000
# Twilio SMS
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM=+1XXXXXXXXXX
# SendGrid Email
SENDGRID_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM=no-reply@zyvastra.com
```
  - npm run dev

API Endpoints:
- POST /api/send-sms { to, body }
- POST /api/send-email { to, subject, text }

## Wiring app to backend
The app currently opens the user's SMS/Email app. To switch to server-based sending, we can add a feature flag and call the above endpoints from `ContactEnquiryModal`.
