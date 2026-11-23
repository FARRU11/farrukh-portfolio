#!/bin/bash
# Local preview launcher for macOS
# Double-click this file in Finder to start or view the website!

cd "$(dirname "$0")"

# Check if port 8080 is already in use
PORT=8080
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
  echo "Port 8080 is already running! Opening browser..."
  open "http://localhost:8080"
  exit 0
fi

echo "=========================================================="
echo "  🚀 Starting Farrukh Portfolio preview server..."
echo "=========================================================="
echo "  Directory : $(pwd)"
echo "  Local URL : http://localhost:$PORT"
echo "=========================================================="
echo "  Opening your web browser..."
echo "  Press Ctrl+C in this window to stop the server."
echo "=========================================================="

(sleep 0.8 && open "http://localhost:$PORT") &
python3 -m http.server $PORT
