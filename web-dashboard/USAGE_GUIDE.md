# ShiftGuard Web Dashboard - Usage Guide

## Quick Start (3 Steps)

### Step 1: Open the Dashboard
Simply double-click `index.html` or open it in your web browser.

**Recommended Browsers:**
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

### Step 2: Upload Your Data
1. Click the **"Choose File"** button
2. Select your ShiftGuard Excel file (.xlsx or .xls)
3. Click **"Load Data"**

### Step 3: Explore Your Data
Navigate through the different views:
- **Dashboard**: Visual overview with charts and KPIs
- **Employees**: Detailed employee breakdown
- **Payroll**: Complete payroll information
- **Reports**: Summary reports and export options

---

## Testing with Sample Data

To test the dashboard with the included sample data:

1. Open the dashboard (`index.html`)
2. Click **"Choose File"**
3. Navigate to: `../ShiftGuard_Complete_System/Excel_Files/ShiftGuard_System.xlsx`
4. Click **"Load Data"**
5. Explore the populated dashboard!

---

## Dashboard Views Explained

### 🎯 Dashboard View

**KPI Cards** (Top Row):
- **Total Employees**: Number of unique employees in the data
- **Total Hours**: Sum of all worked hours
- **Total Gross Pay**: Total payroll cost before deductions
- **Avg Utilization**: Average percentage of expected hours worked

**Charts**:
- **Department Performance**: Bar chart showing hours by department
- **Shift Distribution**: Pie chart of shift types (Day/Night/Evening)
- **Overtime Analysis**: Distribution of employees by overtime hours
- **Payment Breakdown**: Composition of total pay (base, overtime, allowances)

**Metrics Panel**:
- Total Overtime Hours
- Total Lost Time
- Night Shift Hours
- Total Net Pay

### 👥 Employees View

Shows aggregated data per employee:
- Employee ID
- Department
- Total Hours Worked
- Overtime Hours
- Average Utilization %
- Gross Pay
- Net Pay

Click on any column header to sort (if enabled in browser).

### 💰 Payroll View

**Summary Cards**:
- Total Payroll Cost (Gross)
- Total Deductions
- Total Net Pay
- Average Cost Per Hour

**Detailed Table**:
Shows per-day, per-employee payroll records:
- Date
- Hours breakdown (Regular/Overtime)
- Pay components (Base/OT/Allowances)
- Deductions
- Net Pay

### 📊 Reports View

**Department Summary**:
- Employees per department
- Total hours per department
- Total cost per department

**Shift Summary**:
- Total hours per shift type
- Employee count per shift
- Average rate per shift

**Export Options**:
- Export Employees (CSV)
- Export Payroll (CSV)
- Export Summary (CSV)

---

## Understanding the Calculations

### Hours Calculations

```
Worked Hours = (Clock-Out - Clock-In) - Unpaid Breaks
Regular Hours = MIN(Worked Hours, Expected Hours)
Overtime Hours = MAX(0, Worked Hours - Expected Hours)
Lost Time = MAX(0, Expected Hours - Worked Hours)
Utilization % = (Worked Hours ÷ Expected Hours) × 100
```

**Example:**
- Clock-In: 08:00, Clock-Out: 16:30
- Total Time: 8.5 hours
- Breaks: 30 min tea + 45 min lunch = 75 min (1.25 hrs)
- Paid Breaks: 30 min tea + 30 min lunch = 60 min (1.0 hr)
- Unpaid Breaks: 15 min (0.25 hr)
- **Worked Hours: 8.25 hours**
- Expected: 7.5 hours
- **Regular: 7.5 hrs, Overtime: 0.75 hrs**
- **Utilization: 110%**

### Payroll Calculations

```
Base Pay = Regular Hours × Hourly Rate
Overtime Pay = Overtime Hours × Hourly Rate × Overtime Multiplier
Night Allowance = Night Hours × Hourly Rate × Night Allowance %
Weekend Allowance = Weekend Hours × Hourly Rate × Weekend Allowance %

Gross Pay = Base + Overtime + Night Allowance + Weekend Allowance

Tax = Gross Pay × Tax Rate
Pension = Gross Pay × Pension Rate
Total Deductions = Tax + Health Insurance + Pension

Net Pay = Gross Pay - Total Deductions
```

**Example (Regular Day Shift):**
- Regular: 7.5 hrs, Overtime: 0.5 hrs
- Hourly Rate: $25
- Base Pay: 7.5 × $25 = **$187.50**
- OT Pay: 0.5 × $25 × 1.5 = **$18.75**
- **Gross: $206.25**
- Tax (15%): $30.94
- Insurance: $50.00
- Pension (5%): $10.31
- Deductions: **$91.25**
- **Net Pay: $115.00**

**Example (Night Shift with Overtime):**
- Regular: 7.5 hrs, Overtime: 1.5 hrs, All Night: 9 hrs
- Hourly Rate: $25
- Base Pay: 7.5 × $25 = **$187.50**
- OT Pay: 1.5 × $25 × 1.5 = **$56.25**
- Night Allowance: 9 × $25 × 0.15 = **$33.75**
- **Gross: $277.50**
- Tax (15%): $41.63
- Insurance: $50.00
- Pension (5%): $13.88
- Deductions: **$105.51**
- **Net Pay: $171.99**

---

## Troubleshooting

### ❌ "No data found in the BiometricData sheet"

**Solution:**
1. Ensure your Excel file has a sheet named exactly `BiometricData`
2. Check that the first row contains headers
3. Verify data starts from row 2

### ❌ Charts not displaying

**Solution:**
1. Check your internet connection (CDN libraries needed)
2. Try a different browser
3. Check browser console (F12) for errors
4. Clear browser cache and reload

### ❌ Wrong calculations

**Solution:**
1. Verify date format is YYYY-MM-DD (e.g., 2025-01-01)
2. Check time format is HH:MM (e.g., 08:00, 16:30)
3. Ensure break times are in minutes (not hours)
4. Verify Settings sheet values if present

### ❌ File won't upload

**Solution:**
1. Ensure file extension is .xlsx, .xls, or .csv
2. Check file is not corrupted
3. Try saving a copy and uploading the copy
4. Maximum recommended file size: 10MB

### ❌ Export not working

**Solution:**
1. Disable popup blocker for this page
2. Check browser download settings
3. Ensure you have write permissions in Downloads folder
4. Try a different browser

---

## Tips & Best Practices

### 📋 Data Entry Tips

1. **Consistent Formatting**: Use the same date/time format throughout
2. **Valid Department Names**: Keep department names consistent
3. **Shift Types**: Use Day/Night/Evening (case-insensitive)
4. **Employee IDs**: Keep format consistent (e.g., E001, E002)

### 🎨 Viewing Tips

1. **Use Full Screen**: Press F11 for better viewing experience
2. **Zoom**: Use Ctrl/Cmd + or - to adjust zoom level
3. **Print**: Use Ctrl/Cmd + P to print reports
4. **Export**: Download CSVs for Excel/Google Sheets analysis

### 🔄 Data Updates

1. **Refresh Dashboard**: Upload a new file to update all views
2. **Multiple Periods**: Upload files for different periods separately
3. **Comparison**: Export data from different periods for comparison
4. **Backup**: Keep original Excel files as backups

### 🚀 Performance Tips

1. **Large Files**: Files with 1000+ records may take a few seconds to load
2. **Browser Memory**: Close other tabs for better performance
3. **Regular Exports**: Export data regularly for historical tracking
4. **Clean Data**: Remove test/invalid records before uploading

---

## Keyboard Shortcuts

- **F11**: Full screen mode
- **F12**: Open browser developer console (for debugging)
- **Ctrl/Cmd + P**: Print current view
- **Ctrl/Cmd + R**: Reload page
- **Ctrl/Cmd + F**: Find on page
- **Ctrl/Cmd + +/-**: Zoom in/out

---

## Data Privacy & Security

✅ **Your Data is Safe**:
- All processing happens in your browser
- No data is sent to any server
- No data is stored permanently
- Files are read locally from your device

❌ **No Internet Required** (after first load):
- Dashboard works offline
- Only CDN libraries need internet on first load
- Can be used in air-gapped environments (with local libraries)

---

## Excel File Requirements

### Required Sheet: BiometricData

**Required Columns:**
1. Employee ID
2. Date (YYYY-MM-DD)
3. Clock-In (HH:MM)
4. Clock-Out (HH:MM)
5. Tea Break (minutes)
6. Lunch Break (minutes)
7. Department
8. Shift Type

### Optional Sheet: Settings

**Recognized Settings:**
- Expected Hours/Day (default: 7.5)
- Hourly Rate (default: 25)
- Overtime Multiplier (default: 1.5)
- Night Allowance (default: 0.15 = 15%)
- Weekend Allowance (default: 0.20 = 20%)
- Tax Rate (default: 0.15 = 15%)
- Health Insurance (default: 50)
- Pension Rate (default: 0.05 = 5%)

Format: Two columns (Setting Name | Value)

### Optional Sheets

If present, these will be used instead of calculating:
- **Calculations**: Pre-calculated hours data
- **Payroll**: Pre-calculated payroll data

---

## Frequently Asked Questions

**Q: Can I use this without Excel installed?**
A: Yes! You only need a web browser.

**Q: Does it work on mobile?**
A: Yes, the dashboard is fully responsive and works on phones and tablets.

**Q: Can I customize the calculations?**
A: Yes, edit the `js/app.js` file to modify calculation logic.

**Q: What about historical data?**
A: Load files for different periods separately or combine them in Excel first.

**Q: Can I print the dashboard?**
A: Yes, use Ctrl/Cmd + P. The print stylesheet removes navigation.

**Q: Is there a file size limit?**
A: No hard limit, but 10MB+ files may slow down processing.

**Q: Can I use CSV files?**
A: Yes, CSV files with BiometricData format are supported.

**Q: Does it work with Google Sheets?**
A: Export from Google Sheets as .xlsx and upload.

**Q: Can I share the dashboard with colleagues?**
A: Yes, just share the web-dashboard folder. They need to upload their own data.

**Q: What if my columns are named differently?**
A: Column names must match exactly (case-insensitive). Rename in Excel first.

---

## Getting Help

1. **Check Documentation**: Read the README.md file
2. **Review Troubleshooting**: See solutions above
3. **Check Console**: Press F12 to see error messages
4. **Test Sample Data**: Use included sample file to verify dashboard works
5. **Browser Support**: Try a different modern browser

---

## Version Information

- **Dashboard Version**: 1.0.0
- **Compatible with**: ShiftGuard v2.0+
- **Last Updated**: October 2025
- **Browser Requirements**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

**Ready to start?** Open `index.html` and upload your data! 🎉

For more technical details, see [README.md](README.md)
