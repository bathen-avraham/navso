@echo off
REM ----------------------------------------------------------------------------
REM Windows wrapper for infra/deploy.sh — runs Git Bash without going through
REM PowerShell's `bash` (which on this machine resolves to a broken WSL stub).
REM
REM Usage from PowerShell or cmd, in the navso/ folder:
REM   infra\deploy.cmd
REM   infra\deploy.cmd EC2_HOST=1.2.3.4
REM ----------------------------------------------------------------------------

setlocal

set "BASH="
if exist "%ProgramFiles%\Git\bin\bash.exe" set "BASH=%ProgramFiles%\Git\bin\bash.exe"
if not defined BASH if exist "%ProgramFiles(x86)%\Git\bin\bash.exe" set "BASH=%ProgramFiles(x86)%\Git\bin\bash.exe"
if not defined BASH if exist "%LOCALAPPDATA%\Programs\Git\bin\bash.exe" set "BASH=%LOCALAPPDATA%\Programs\Git\bin\bash.exe"

if not defined BASH (
  echo Git Bash not found. Install Git for Windows from https://git-scm.com/download/win
  exit /b 1
)

REM Run deploy.sh with whatever args were passed through.
"%BASH%" "%~dp0deploy.sh" %*
endlocal
