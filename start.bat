@echo off
cd /d "C:\Users\Izzatbek\my-vite-project"
start npm run dev
timeout /t 3
start http://localhost:5173
exit