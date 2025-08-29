#!/bin/bash

echo "🚀 Starting Risk Navigator Vibe - Integrated Risk Management Dashboard"
echo "=================================================================="

# Check if ports are available
echo "🔍 Checking port availability..."
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Port 3001 (backend) is already in use"
    exit 1
fi

# Vite might use different ports, so we'll check dynamically
echo "✅ Port 3001 (backend) is available"

# Start backend server
echo "🔧 Starting backend server on port 3001..."
node server/index.js &
BACKEND_PID=$!
echo "📊 Backend server started with PID: $BACKEND_PID"

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Test backend health
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend server is healthy"
else
    echo "❌ Backend server health check failed"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend dev server
echo "🎨 Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!
echo "🌐 Frontend server started with PID: $FRONTEND_PID"

# Wait for frontend to start
echo "⏳ Waiting for frontend to initialize..."
sleep 8

# Find which port Vite is actually using
VITE_PORT=$(lsof -Pi -p $FRONTEND_PID -sTCP:LISTEN | grep LISTEN | awk '{print $9}' | cut -d: -f2 | head -1)

if [ -n "$VITE_PORT" ]; then
    echo "✅ Frontend server is accessible on port $VITE_PORT"
    echo "🌐 Frontend URL: http://localhost:$VITE_PORT"
else
    echo "❌ Could not determine frontend port"
fi

echo ""
echo "🎉 Risk Navigator Vibe is starting up!"
echo "📊 Backend API: http://localhost:3001"
echo "🌐 Frontend: http://localhost:$VITE_PORT"
echo "🔗 Health Check: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Keep script running
wait 