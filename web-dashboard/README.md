# ShiftGuard Web Dashboard

A modern, responsive web-based dashboard for the ShiftGuard Employee Management System. This dashboard provides real-time visualization of employee hours, payroll data, and performance metrics using JavaScript, Bootstrap, HTML, and CSS.

## Features

### 📊 Interactive Dashboard
- **Real-time KPIs**: Total employees, hours worked, gross pay, and utilization metrics
- **Visual Charts**: Department performance, shift distribution, overtime analysis, and payment breakdowns
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 👥 Employee Management
- Detailed employee view with aggregated data
- Individual performance metrics
- Department-wise organization
- Utilization tracking per employee

### 💰 Payroll Processing
- Complete payroll calculations from Excel data
- Payment component breakdown (base pay, overtime, allowances)
- Automatic deductions (tax, insurance, pension)
- Gross and net pay calculations
- Per-employee and per-date payroll details

### 📈 Reports & Analytics
- Department summary with cost analysis
- Shift type analysis
- Export functionality (CSV format)
- Customizable data views

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with animations and responsive design
- **Bootstrap 5**: Modern UI framework for responsive layouts
- **JavaScript (Vanilla)**: No frameworks required - pure JavaScript
- **SheetJS (xlsx.js)**: Excel file parsing in the browser
- **Chart.js**: Beautiful, interactive data visualizations

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser!

### Installation

1. **Extract the files** or clone the repository
2. **Navigate to the web-dashboard folder**
3. **Open `index.html`** in your web browser

That's it! No installation, no dependencies, no server setup required.

### Quick Start

1. Open `index.html` in your browser
2. Click the "Load Data" button
3. Select your ShiftGuard Excel file (`.xlsx` or `.xls`)
4. The dashboard will automatically process and display your data

### Using with Existing Data

The dashboard works with the existing ShiftGuard Excel files:
- Navigate to `ShiftGuard_Complete_System/Excel_Files/`
- Use `ShiftGuard_System.xlsx` or `ShiftGuard_Template.xlsx`
- Upload the file to see your data visualized instantly

## File Structure

```
web-dashboard/
├── index.html          # Main dashboard page
├── css/
│   └── style.css      # Custom styles and responsive design
├── js/
│   └── app.js         # Dashboard logic and data processing
└── README.md          # This file
```

## Excel File Format

The dashboard reads data from Excel files with the following sheets:

### BiometricData Sheet (Required)
Columns:
- Employee ID
- Date
- Clock-In (HH:MM format)
- Clock-Out (HH:MM format)
- Tea Break (minutes)
- Lunch Break (minutes)
- Department
- Shift Type

### Settings Sheet (Optional)
Configuration parameters:
- Expected Hours/Day
- Hourly Rate
- Overtime Multiplier
- Night Shift Allowance
- Weekend Allowance
- Tax Rate
- Health Insurance
- Pension Rate

### Calculations Sheet (Optional)
If present, pre-calculated data will be used. Otherwise, calculations will be performed automatically from BiometricData.

### Payroll Sheet (Optional)
If present, payroll data will be used. Otherwise, payroll will be calculated automatically.

## Features in Detail

### Dashboard View
- **KPI Cards**: Quick overview of key metrics
- **Department Chart**: Bar chart showing hours by department
- **Shift Distribution**: Pie chart of shift types
- **Overtime Analysis**: Breakdown of overtime by range
- **Payment Breakdown**: Visual representation of pay components

### Employees View
- Table with all employee data
- Aggregated hours and pay by employee
- Department organization
- Average utilization per employee

### Payroll View
- Summary cards with total payroll metrics
- Detailed payroll table with all calculations
- Per-day, per-employee breakdown
- All payment components visible

### Reports View
- Department summary table
- Shift summary table
- Export options for all data types
- CSV downloads for further analysis

## Calculations

### Hours Calculation
```
Worked Hours = Clock-Out - Clock-In - Unpaid Breaks
Regular Hours = MIN(Worked Hours, Expected Hours)
Overtime Hours = MAX(0, Worked Hours - Expected Hours)
Lost Time = MAX(0, Expected Hours - Worked Hours)
Utilization = (Worked Hours / Expected Hours) × 100%
```

### Payroll Calculation
```
Base Pay = Regular Hours × Hourly Rate
Overtime Pay = Overtime Hours × Hourly Rate × Overtime Multiplier
Night Allowance = Night Hours × Hourly Rate × Night Allowance %
Weekend Allowance = Weekend Hours × Hourly Rate × Weekend Allowance %
Gross Pay = Base Pay + Overtime Pay + Night Allowance + Weekend Allowance

Tax = Gross Pay × Tax Rate
Pension = Gross Pay × Pension Rate
Total Deductions = Tax + Health Insurance + Pension
Net Pay = Gross Pay - Total Deductions
```

## Default Settings

If no Settings sheet is provided, the following defaults are used:

| Setting | Default Value |
|---------|---------------|
| Expected Hours/Day | 7.5 hours |
| Hourly Rate | $25.00 |
| Currency | USD |
| Overtime Multiplier | 1.5x |
| Night Shift Allowance | 15% |
| Weekend Allowance | 20% |
| Tax Rate | 15% |
| Health Insurance | $50.00 |
| Pension Rate | 5% |
| Paid Tea Break | 30 minutes |
| Paid Lunch Break | 30 minutes |

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## Performance

- **Fast Loading**: No server calls required
- **Client-Side Processing**: All calculations done in the browser
- **Large Datasets**: Handles 1000+ employee records efficiently
- **Responsive**: Optimized for mobile and desktop

## Export Options

All data can be exported to CSV format:

1. **Employee Summary**: Aggregated employee data with totals
2. **Payroll Data**: Complete payroll calculations
3. **Calculations Summary**: Detailed calculations per record

## Customization

### Modifying Colors
Edit `css/style.css` and change the color variables:
```css
:root {
    --primary-color: #0d6efd;
    --success-color: #198754;
    --warning-color: #ffc107;
    /* ... more colors */
}
```

### Adding New Metrics
Edit `js/app.js` and add calculations in the relevant update functions.

### Changing Default Settings
Modify the `DEFAULT_SETTINGS` object in `js/app.js`.

## Security & Privacy

- **100% Client-Side**: All data processing happens in your browser
- **No Server**: No data is sent to any server
- **No Storage**: Data is not saved (unless you export it)
- **Local Only**: Excel files are read locally from your device

## Troubleshooting

### Data Not Loading
- Ensure the Excel file has a "BiometricData" sheet
- Check that column names match exactly (including case)
- Verify dates are in YYYY-MM-DD format
- Ensure times are in HH:MM format

### Charts Not Displaying
- Check browser console for errors (F12)
- Ensure all CDN resources are loading (check internet connection)
- Try refreshing the page

### Incorrect Calculations
- Verify Settings sheet values if present
- Check that Clock-In/Clock-Out times are valid
- Ensure break times are in minutes (numeric)

### Export Not Working
- Check if popup blocker is enabled
- Ensure browser allows downloads
- Try a different browser

## Future Enhancements

Potential features for future versions:
- [ ] Date range filtering
- [ ] Employee search and filter
- [ ] Print-friendly reports
- [ ] PDF export
- [ ] Multi-file comparison
- [ ] Historical data tracking
- [ ] Advanced analytics

## Comparison with Excel Version

| Feature | Excel Version | Web Dashboard |
|---------|--------------|---------------|
| Platform | Excel (Desktop) | Web Browser (Any Device) |
| Setup | VBA Installation | Open HTML File |
| Updates | Manual Refresh | Automatic |
| Charts | Static | Interactive |
| Mobile | Limited | Full Support |
| Export | Built-in | CSV Download |
| Sharing | Email File | Share Link |

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the Excel file format requirements
3. Check browser console for errors
4. Ensure using a supported browser

## Credits

Built with:
- [Bootstrap 5](https://getbootstrap.com/) - UI Framework
- [Chart.js](https://www.chartjs.org/) - Data Visualization
- [SheetJS](https://sheetjs.com/) - Excel File Processing
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon Library

## License

This dashboard is part of the ShiftGuard Employee Management System and follows the same license as the parent project.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Compatibility**: ShiftGuard v2.0+

---

## Quick Links

- [Excel System Documentation](../ShiftGuard_Complete_System/Documentation/README.txt)
- [Sample Data](../ShiftGuard_Complete_System/Sample_Data/sample_biometric_data.csv)
- [Excel Files](../ShiftGuard_Complete_System/Excel_Files/)

---

**Ready to get started?** Just open `index.html` and upload your data! 🚀
