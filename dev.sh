#!/bin/bash

# Simple development server restart script
# Quick solution for port conflicts and cache cleanup

PORT=3000

echo "🔄 Restarting development server..."

# 1. Stop process using port 3000
echo "📡 Checking port $PORT..."
PID=$(lsof -ti:$PORT)
if [ ! -z "$PID" ]; then
    echo "🛑 Stopping process $PID"
    kill -9 $PID
    sleep 1
else
    echo "✅ Port $PORT is not in use"
fi

# 2. Clean Next.js cache
echo "🧹 Cleaning cache..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "✅ .next cache cleared"
else
    echo "✅ No cache to clean"
fi

# 3. Start development server
echo "🚀 Starting development server..."
echo "================================"
npm run dev
