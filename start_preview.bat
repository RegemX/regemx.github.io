@echo off
echo Starting Local Gemocracy Preview Server...
echo This is required because modern 3D websites (Modules) cannot run directly from file://
echo.
echo Opening browser...
start http://localhost:8000
echo.
echo Server is running. Close this window to stop.
python -m http.server 8000
pause
