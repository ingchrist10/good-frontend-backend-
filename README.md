# Analytix Hive - Frontend-Backend Application

A full-stack web application with Django REST Framework backend and Next.js frontend, featuring JWT authentication, Google OAuth, and comprehensive API endpoints.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
./start-servers.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Create and activate virtual environment
python3 -m venv backend-env
source backend-env/bin/activate

# Install dependencies
pip install -r backend-codes/requirements.txt
pip install cryptography google-auth google-auth-oauthlib google-auth-httplib2

# Run migrations
cd backend-codes
python manage.py migrate

# Start backend server
python manage.py runserver 0.0.0.0:8000
```

#### Frontend Setup
```bash
# Install dependencies
cd frontend-codes
npm install

# Start frontend server
npm run dev
```

## 📋 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Test Page**: http://localhost:3000/test
- **Django Admin**: http://localhost:8000/admin

## 🔑 Test Credentials

### Regular User
- **Username**: `testuser`
- **Email**: `test@example.com`
- **Password**: `TestPass123!`

### Admin User
- **Username**: `admin`
- **Email**: `admin@example.com`
- **Password**: `admin123`

## 📚 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/auth/` | Landing page with Google login | No |
| `POST` | `/auth/register/` | User registration | No |
| `POST` | `/auth/token/` | Login (get JWT tokens) | No |
| `POST` | `/auth/token/refresh/` | Refresh JWT token | No |
| `GET` | `/auth/protected/` | Protected endpoint | Yes |
| `GET` | `/auth/google/login/` | Google OAuth redirect | No |
| `POST` | `/auth/google/login/` | Google OAuth with ID token | No |
| `GET` | `/auth/google/callback/` | Google OAuth callback | No |

### Request/Response Examples

#### User Registration
```bash
curl -X POST http://localhost:8000/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

#### User Login
```bash
curl -X POST http://localhost:8000/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

#### Access Protected Endpoint
```bash
curl -X GET http://localhost:8000/auth/protected/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔧 Configuration

### Backend Environment Variables
Create `backend-codes/.env`:
```env
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

### Frontend Environment Variables
Create `frontend-codes/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📋 Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)

## 📋 Username Requirements

- Minimum 3 characters
- Only letters, numbers, and underscores allowed

## 🛠️ Technology Stack

### Backend
- **Framework**: Django 4.2.23
- **API**: Django REST Framework 3.16.0
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: SQLite (development)
- **CORS**: django-cors-headers
- **OAuth**: django-allauth with Google provider

### Frontend
- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query + Zustand
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

## 🔒 Security Features

- JWT token authentication with refresh tokens
- Token blacklisting on refresh
- Password strength validation
- CORS protection
- Rate limiting on authentication endpoints
- Google OAuth2 integration

## 📁 Project Structure

```
frontend-backend/
├── backend-codes/           # Django backend
│   ├── authentication/     # Authentication app
│   ├── .env                # Backend environment variables
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── settings.py         # Django settings
├── frontend-codes/         # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── services/         # API service functions
│   ├── .env.local        # Frontend environment variables
│   └── package.json      # Node.js dependencies
├── backend-env/           # Python virtual environment
├── start-servers.sh       # Automated startup script
├── API_ENDPOINTS_SUMMARY.md # Detailed API documentation
└── README.md             # This file
```

## 🧪 Testing the Connection

1. Visit http://localhost:3000/test
2. Use the test buttons to verify:
   - User registration
   - User login
   - Protected endpoint access

## 🔧 Development Commands

### Backend Commands
```bash
# Activate virtual environment
source backend-env/bin/activate

# Run migrations
cd backend-codes && python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver 0.0.0.0:8000
```

### Frontend Commands
```bash
# Install dependencies
cd frontend-codes && npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes on ports 3000 and 8000
   lsof -ti:3000 | xargs kill -9
   lsof -ti:8000 | xargs kill -9
   ```

2. **Python virtual environment issues**
   ```bash
   # Remove and recreate virtual environment
   rm -rf backend-env
   python3 -m venv backend-env
   source backend-env/bin/activate
   pip install -r backend-codes/requirements.txt
   ```

3. **Node modules issues**
   ```bash
   # Clear npm cache and reinstall
   cd frontend-codes
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **CORS errors**
   - Ensure `CORS_ALLOWED_ORIGINS` in backend settings includes frontend URL
   - Check that `NEXT_PUBLIC_API_URL` in frontend points to correct backend URL

## 📖 Additional Documentation

- [API Endpoints Summary](API_ENDPOINTS_SUMMARY.md) - Detailed API documentation
- [Django Documentation](https://docs.djangoproject.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Django REST Framework](https://www.django-rest-framework.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.