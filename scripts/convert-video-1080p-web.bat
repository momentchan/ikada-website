@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM =====================================================
REM Drag & drop one or more video files onto this .bat
REM Output: <name>-1080p-web.mp4 (same folder as input)
REM
REM Web hero settings (IKADA) - smaller files:
REM   - 1080p height, even width (yuv420p)
REM   - H.264, CRF 28 + max 4 Mbps cap
REM   - No audio (hero videos are muted)
REM   - faststart (plays while downloading)
REM   - Lanczos scaling
REM
REM Typical result:
REM   ~12s clip  -> ~6-9 MB
REM   ~24s clip  -> ~10-15 MB
REM =====================================================

set "FFMPEG=C:\ffmpeg\bin\ffmpeg.exe"

IF "%~1"=="" (
    echo Drag and drop one or more video files onto this .bat to convert them.
    pause
    exit /b
)

IF NOT EXIST "%FFMPEG%" (
    echo [ERROR] ffmpeg not found at %FFMPEG%
    echo Edit FFMPEG at the top of this .bat, or add ffmpeg to PATH.
    pause
    exit /b 1
)

:loop
set "input=%~1"
IF NOT DEFINED input GOTO done

IF NOT EXIST "%input%" (
    echo [SKIP] Not found: "%input%"
    GOTO next
)

for %%A in ("%input%") do (
    set "filepath=%%~dpA"
    set "filename=%%~nA"
)

set "output=%filepath%%filename%-1080p-web.mp4"

IF EXIST "%output%" (
    set /a idx=1
    :find_free_name
    set "try=%filepath%%filename%-1080p-web(!idx!).mp4"
    IF EXIST "!try!" (
        set /a idx+=1
        GOTO find_free_name
    ) ELSE (
        set "output=!try!"
    )
)

echo.
echo ==============================
echo Input : "%input%"
echo Output: "%output%"
echo ==============================

"%FFMPEG%" -hide_banner -y -i "%input%" ^
  -an ^
  -vf "scale=-2:1080:flags=lanczos" ^
  -c:v libx264 -preset slow -crf 28 -maxrate 4M -bufsize 8M -profile:v high -level 4.1 -pix_fmt yuv420p ^
  -movflags +faststart ^
  "%output%"

IF ERRORLEVEL 1 (
    echo [FAIL] Conversion failed: "%input%"
) ELSE (
    for %%F in ("%output%") do set /a sizeMB=%%~zF/1048576
    echo [OK] Converted: "%output%" ^(~!sizeMB! MB^)
)

:next
shift
GOTO loop

:done
echo.
echo All tasks finished.
echo.
echo Still too large? Edit this .bat:
echo   -crf 28        try 30 for smaller / softer
echo   -maxrate 4M     try 3M for smaller
echo.
echo For IKADA site, copy to public\video\ and update src\lib\site.ts
pause
endlocal
