# Analytix Hive API Endpoints Summary

## Backend Server
- **URL**: http://localhost:8000
- **Framework**: Django REST Framework
- **Authentication**: JWT (JSON Web Tokens)

## Frontend Server
- **URL**: http://localhost:3000
- **Framework**: Next.js
- **State Management**: React Query + Zustand

## Available Endpoints

### 1. Landing Page
- **URL**: `GET /auth/`
- **Description**: Welcome page with Google login option
- **Authentication**: None required
- **Response**: HTML page

### 2. User Registration
- **URL**: `POST /auth/register/`
- **Description**: Register a new user account
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "username": "string (min 3 chars, alphanumeric + underscore)",
    "email": "string (valid email)",
    "password": "string (min 8 chars, must contain: uppercase, lowercase, number, special char)"
  }
  ```
- **Response**: User object with id, username, email
- **Status**: 201 Created

### 3. User Login (JWT Token)
- **URL**: `POST /auth/token/`
- **Description**: Login and get JWT tokens
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
  }
  ```
- **Status**: 200 OK

### 4. Token Refresh
- **URL**: `POST /auth/token/refresh/`
- **Description**: Refresh access token using refresh token
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "refresh": "jwt_refresh_token"
  }
  ```
- **Response**:
  ```json
  {
    "access": "new_jwt_access_token",
    "refresh": "new_jwt_refresh_token"
  }
  ```
- **Status**: 200 OK

### 5. Protected Endpoint
- **URL**: `GET /auth/protected/`
- **Description**: Test protected endpoint requiring authentication
- **Authentication**: Bearer token required
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**:
  ```json
  {
    "message": "This is a protected endpoint.",
    "user": {
      "id": 2,
      "email": "user@example.com",
      "username": "username",
      "profile_picture": null
    }
  }
  ```
- **Status**: 200 OK

### 6. Google OAuth Login (Redirect)
- **URL**: `GET /auth/google/login/`
- **Description**: Redirect to Google OAuth consent screen
- **Authentication**: None required
- **Response**: Redirect to Google OAuth

### 7. Google OAuth Login (Token)
- **URL**: `POST /auth/google/login/`
- **Description**: Login with Google ID token
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "id_token": "google_id_token"
  }
  ```
- **Response**:
  ```json
  {
    "user": "user_object",
    "access_token": "jwt_access_token",
    "refresh_token": "jwt_refresh_token"
  }
  ```
- **Status**: 200 OK

### 8. Google OAuth Callback
- **URL**: `GET /auth/google/callback/`
- **Description**: Handle Google OAuth callback
- **Authentication**: None required
- **Query Parameters**: `code` (from Google)
- **Response**: HTML page with tokens (for development)

## Frontend Authentication Service Functions

### Available Functions in `services/auth.ts`:

1. **signupUser(data: SignupFormData)**
   - Calls: `POST /auth/register/`
   - Purpose: Register new user

2. **signinUser(data: LoginFormData)**
   - Calls: `POST /auth/token/`
   - Purpose: Login user and get tokens

3. **googleLogin(idToken: string)**
   - Calls: `POST /auth/google/login/`
   - Purpose: Login with Google ID token

4. **refreshToken(refreshToken: string)**
   - Calls: `POST /auth/token/refresh/`
   - Purpose: Refresh access token

5. **getProtectedData(accessToken: string)**
   - Calls: `GET /auth/protected/`
   - Purpose: Test protected endpoint access

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)

## Username Requirements
- Minimum 3 characters
- Only letters, numbers, and underscores allowed

## CORS Configuration
- Frontend URL (http://localhost:3000) is allowed
- Credentials are allowed for cross-origin requests

## JWT Configuration
- Access token lifetime: 15 minutes
- Refresh token lifetime: 7 days
- Tokens are rotated on refresh
- Blacklisted tokens after rotation

## Environment Variables

### Backend (.env):
```
SECRET_KEY=django-insecure-your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback/
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=15
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7
```

### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing Examples

### Register User:
```bash
curl -X POST http://localhost:8000/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "TestPass123!"}'
```

### Login User:
```bash
curl -X POST http://localhost:8000/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPass123!"}'
```

### Access Protected Endpoint:
```bash
curl -X GET http://localhost:8000/auth/protected/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Status
✅ Backend server running on http://localhost:8000
✅ Frontend server running on http://localhost:3000
✅ All endpoints tested and working
✅ JWT authentication configured
✅ CORS configured for frontend-backend communication
✅ Google OAuth setup (requires Google Cloud Console configuration)
✅ Database migrations applied
✅ Token blacklist functionality enabled