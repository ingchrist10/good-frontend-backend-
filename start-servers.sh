#!/bin/bash

# Analytix Hive Frontend-Backend Startup Script

echo "🚀 Starting Analytix Hive Frontend-Backend Application"
echo "=================================================="

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check if required ports are available
echo "🔍 Checking port availability..."
check_port 8000
BACKEND_PORT_AVAILABLE=$?
check_port 3000
FRONTEND_PORT_AVAILABLE=$?

if [ $BACKEND_PORT_AVAILABLE -ne 0 ] || [ $FRONTEND_PORT_AVAILABLE -ne 0 ]; then
    echo "❌ Required ports are not available. Please stop other services and try again."
    exit 1
fi

echo ""
echo "🔧 Setting up environment..."

# Create virtual environment if it doesn't exist
if [ ! -d "backend-env" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv backend-env
fi

# Activate virtual environment and install dependencies
echo "📦 Installing backend dependencies..."
source backend-env/bin/activate
pip install -r backend-codes/requirements.txt
pip install cryptography google-auth google-auth-oauthlib google-auth-httplib2

# Run Django migrations
echo "🗄️  Running database migrations..."
cd backend-codes
python manage.py migrate
cd ..

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "frontend-codes/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend-codes
    npm install
    cd ..
fi

echo ""
echo "🚀 Starting servers..."

# Start backend server in background
echo "🔧 Starting Django backend server on http://localhost:8000..."
cd backend-codes
source ../backend-env/bin/activate
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server in background
echo "🎨 Starting Next.js frontend server on http://localhost:3000..."
cd frontend-codes
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 5

echo ""
echo "✅ Both servers are starting up!"
echo "=================================================="
echo "🔧 Backend (Django):  http://localhost:8000"
echo "🎨 Frontend (Next.js): http://localhost:3000"
echo "🧪 Test Page:         http://localhost:3000/test"
echo "📚 API Documentation: See API_ENDPOINTS_SUMMARY.md"
echo "=================================================="
echo ""
echo "📋 Available API Endpoints:"
echo "  • POST /auth/register/     - User registration"
echo "  • POST /auth/token/        - User login (get JWT tokens)"
echo "  • POST /auth/token/refresh/ - Refresh JWT token"
echo "  • GET  /auth/protected/    - Protected endpoint (requires auth)"
echo "  • GET  /auth/google/login/ - Google OAuth login"
echo "  • POST /auth/google/login/ - Google OAuth with ID token"
echo ""
echo "🔑 Test Credentials:"
echo "  Username: testuser"
echo "  Email: test@example.com"
echo "  Password: TestPass123!"
echo ""
echo "💡 Tips:"
echo "  • Visit http://localhost:3000/test to test the connection"
echo "  • Check API_ENDPOINTS_SUMMARY.md for detailed documentation"
echo "  • Backend admin: http://localhost:8000/admin (admin/admin123)"
echo ""
echo "🛑 To stop servers, press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
echo "⏳ Servers are running. Press Ctrl+C to stop..."
wait