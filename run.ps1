# Start the FastAPI backend
Start-Process python -ArgumentList "index.py"

# Wait for the backend to start
Start-Sleep -Seconds 5

# Start ngrok to expose the backend
ngrok http 8000 