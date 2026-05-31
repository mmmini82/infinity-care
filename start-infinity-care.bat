@echo off
cd /d "%~dp0"
echo Starting Infinity Care local server...
echo If Windows asks for permission, allow local network access only if you are comfortable.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\serve.ps1"
pause
