@echo off
title Remove Package
set package=

set /p package=Enter the package name : %=%
cls

npm uninstall %package%
pause > nul