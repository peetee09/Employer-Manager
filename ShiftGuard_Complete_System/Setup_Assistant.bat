@echo off
:: ===================================================================
:: ShiftGuard Setup Assistant
:: Automated setup helper for Windows systems
:: ===================================================================

title ShiftGuard Setup Assistant
color 0A

:: Check if running as admin (optional but helpful)
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo Note: Not running as administrator.
    echo Some features may require elevated permissions.
    echo.
    pause
)

:MENU
cls
echo ===================================================================
echo                    SHIFTGUARD SETUP ASSISTANT
echo ===================================================================
echo.
echo Please select an option:
echo.
echo 1. Open ShiftGuard System Workbook
echo 2. Open ShiftGuard Template (No Data)
echo 3. View README Documentation
echo 4. View Setup Guide
echo 5. View VBA Installation Guide
echo 6. View Troubleshooting Guide
echo 7. View Power BI Setup Guide
echo 8. Open Sample Data CSV
echo 9. Open File Location in Explorer
echo 0. Exit
echo.
echo ===================================================================
set /p choice="Enter your choice (0-9): "

if "%choice%"=="1" goto OPEN_WORKBOOK
if "%choice%"=="2" goto OPEN_TEMPLATE
if "%choice%"=="3" goto VIEW_README
if "%choice%"=="4" goto VIEW_SETUP
if "%choice%"=="5" goto VIEW_VBA
if "%choice%"=="6" goto VIEW_TROUBLESHOOT
if "%choice%"=="7" goto VIEW_POWERBI
if "%choice%"=="8" goto VIEW_SAMPLE
if "%choice%"=="9" goto OPEN_EXPLORER
if "%choice%"=="0" goto EXIT
goto MENU

:OPEN_WORKBOOK
cls
echo ===================================================================
echo Opening ShiftGuard System Workbook...
echo ===================================================================
echo.
echo IMPORTANT: When Excel opens, click "Enable Content" to activate macros!
echo.
pause
start "" "Excel_Files\ShiftGuard_System.xlsm"
timeout /t 3
goto MENU

:OPEN_TEMPLATE
cls
echo ===================================================================
echo Opening ShiftGuard Template (No Sample Data)...
echo ===================================================================
echo.
pause
start "" "Excel_Files\ShiftGuard_Template.xlsx"
timeout /t 3
goto MENU

:VIEW_README
cls
echo ===================================================================
echo Opening README Documentation...
echo ===================================================================
echo.
pause
start "" "Documentation\README.txt"
timeout /t 2
goto MENU

:VIEW_SETUP
cls
echo ===================================================================
echo Opening Setup Guide...
echo ===================================================================
echo.
pause
start "" "Documentation\Setup_Guide.txt"
timeout /t 2
goto MENU

:VIEW_VBA
cls
echo ===================================================================
echo Opening VBA Installation Guide...
echo ===================================================================
echo.
pause
start "" "Documentation\VBA_Installation.txt"
timeout /t 2
goto MENU

:VIEW_TROUBLESHOOT
cls
echo ===================================================================
echo Opening Troubleshooting Guide...
echo ===================================================================
echo.
pause
start "" "Documentation\Troubleshooting.txt"
timeout /t 2
goto MENU

:VIEW_POWERBI
cls
echo ===================================================================
echo Opening Power BI Setup Guide...
echo ===================================================================
echo.
pause
start "" "Power_BI\Power_BI_Setup.txt"
timeout /t 2
goto MENU

:VIEW_SAMPLE
cls
echo ===================================================================
echo Opening Sample CSV Data...
echo ===================================================================
echo.
pause
start "" "Sample_Data\sample_biometric_data.csv"
timeout /t 2
goto MENU

:OPEN_EXPLORER
cls
echo ===================================================================
echo Opening File Location...
echo ===================================================================
echo.
start "" explorer.exe "%cd%"
timeout /t 2
goto MENU

:EXIT
cls
echo ===================================================================
echo                        THANK YOU!
echo ===================================================================
echo.
echo Thank you for using ShiftGuard Employee Tracking System!
echo.
echo For support, please refer to the Documentation folder.
echo.
echo Quick Reference:
echo - Main Workbook: Excel_Files\ShiftGuard_System.xlsm
echo - Documentation: Documentation\README.txt
echo - Sample Data: Sample_Data\sample_biometric_data.csv
echo.
echo ===================================================================
timeout /t 5
exit
