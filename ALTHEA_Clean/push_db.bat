@echo off
echo Pushing Prisma DB schema...
cmd /c "npx prisma db push"
echo Done.
pause
