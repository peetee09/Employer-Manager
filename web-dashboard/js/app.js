// ShiftGuard Dashboard Application
// Global data storage
let biometricData = [];
let settingsData = {};
let calculationsData = [];
let payrollData = [];
let charts = {};

// Default settings (can be overridden from Excel file)
const DEFAULT_SETTINGS = {
    expectedHours: 7.5,
    hourlyRate: 25.0,
    currency: 'USD',
    overtimeMultiplier: 1.5,
    nightAllowance: 0.15,
    weekendAllowance: 0.20,
    taxRate: 0.15,
    healthInsurance: 50.0,
    pensionRate: 0.05,
    paidTeaBreak: 30,
    paidLunchBreak: 30
};

// Initialize settings with defaults
settingsData = { ...DEFAULT_SETTINGS };

/**
 * Load and parse Excel file
 */
function loadExcelFile() {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first!');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Parse BiometricData sheet
            if (workbook.SheetNames.includes('BiometricData')) {
                const sheet = workbook.Sheets['BiometricData'];
                biometricData = XLSX.utils.sheet_to_json(sheet);
            }
            
            // Parse Settings sheet if available
            if (workbook.SheetNames.includes('Settings')) {
                parseSettings(workbook.Sheets['Settings']);
            }
            
            // Parse Calculations sheet if available
            if (workbook.SheetNames.includes('Calculations')) {
                const sheet = workbook.Sheets['Calculations'];
                calculationsData = XLSX.utils.sheet_to_json(sheet);
            }
            
            // Parse Payroll sheet if available
            if (workbook.SheetNames.includes('Payroll')) {
                const sheet = workbook.Sheets['Payroll'];
                payrollData = XLSX.utils.sheet_to_json(sheet);
            }
            
            // If no pre-calculated data, calculate from biometric data
            if (biometricData.length > 0) {
                if (calculationsData.length === 0) {
                    calculationsData = calculateFromBiometric(biometricData);
                }
                if (payrollData.length === 0) {
                    payrollData = calculatePayroll(calculationsData);
                }
                
                // Update all views
                updateDashboard();
                updateEmployeesView();
                updatePayrollView();
                updateReportsView();
                
                // Show dashboard
                showView('dashboard');
                
                // Show success message
                showSuccessMessage(`Successfully loaded ${biometricData.length} records!`);
            } else {
                alert('No data found in the BiometricData sheet!');
            }
            
        } catch (error) {
            console.error('Error parsing file:', error);
            alert('Error parsing file. Please make sure it\'s a valid Excel file with the correct format.');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

/**
 * Parse settings from Settings sheet
 */
function parseSettings(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Look for specific settings
    data.forEach(row => {
        if (row[0] && row[1] !== undefined) {
            const key = row[0].toString().toLowerCase();
            const value = row[1];
            
            if (key.includes('expected hours') || key.includes('expectedhours')) {
                settingsData.expectedHours = parseFloat(value) || DEFAULT_SETTINGS.expectedHours;
            } else if (key.includes('hourly rate') || key.includes('hourlyrate')) {
                settingsData.hourlyRate = parseFloat(value) || DEFAULT_SETTINGS.hourlyRate;
            } else if (key.includes('overtime') && key.includes('multiplier')) {
                settingsData.overtimeMultiplier = parseFloat(value) || DEFAULT_SETTINGS.overtimeMultiplier;
            } else if (key.includes('night') && key.includes('allowance')) {
                settingsData.nightAllowance = parseFloat(value) || DEFAULT_SETTINGS.nightAllowance;
            } else if (key.includes('weekend') && key.includes('allowance')) {
                settingsData.weekendAllowance = parseFloat(value) || DEFAULT_SETTINGS.weekendAllowance;
            } else if (key.includes('tax') && key.includes('rate')) {
                settingsData.taxRate = parseFloat(value) || DEFAULT_SETTINGS.taxRate;
            } else if (key.includes('health') && key.includes('insurance')) {
                settingsData.healthInsurance = parseFloat(value) || DEFAULT_SETTINGS.healthInsurance;
            } else if (key.includes('pension')) {
                settingsData.pensionRate = parseFloat(value) || DEFAULT_SETTINGS.pensionRate;
            }
        }
    });
}

/**
 * Calculate hours and metrics from biometric data
 */
function calculateFromBiometric(data) {
    return data.map(row => {
        const clockIn = parseTime(row['Clock-In']);
        const clockOut = parseTime(row['Clock-Out']);
        const teaBreak = parseFloat(row['Tea Break']) || 0;
        const lunchBreak = parseFloat(row['Lunch Break']) || 0;
        
        // Calculate worked hours
        let workedHours = calculateHoursDifference(clockIn, clockOut);
        
        // Subtract breaks (convert minutes to hours)
        const totalBreaks = (teaBreak + lunchBreak) / 60;
        const paidBreaks = (settingsData.paidTeaBreak + settingsData.paidLunchBreak) / 60;
        const unpaidBreaks = Math.max(0, totalBreaks - paidBreaks);
        
        workedHours = Math.max(0, workedHours - unpaidBreaks);
        
        // Calculate overtime and utilization
        const regularHours = Math.min(workedHours, settingsData.expectedHours);
        const overtimeHours = Math.max(0, workedHours - settingsData.expectedHours);
        const lostTime = Math.max(0, settingsData.expectedHours - workedHours);
        const utilization = (workedHours / settingsData.expectedHours) * 100;
        
        // Determine if night shift
        const isNightShift = (row['Shift Type'] || '').toLowerCase().includes('night');
        const nightHours = isNightShift ? workedHours : 0;
        
        return {
            'Employee ID': row['Employee ID'],
            'Date': row['Date'],
            'Department': row['Department'],
            'Shift Type': row['Shift Type'],
            'Clock-In': row['Clock-In'],
            'Clock-Out': row['Clock-Out'],
            'Worked Hours': workedHours.toFixed(2),
            'Regular Hours': regularHours.toFixed(2),
            'Overtime Hours': overtimeHours.toFixed(2),
            'Lost Time': lostTime.toFixed(2),
            'Night Hours': nightHours.toFixed(2),
            'Utilization': utilization.toFixed(1),
            'Status': getStatus(utilization, overtimeHours)
        };
    });
}

/**
 * Calculate payroll from calculations data
 */
function calculatePayroll(data) {
    return data.map(row => {
        const regularHours = parseFloat(row['Regular Hours']) || 0;
        const overtimeHours = parseFloat(row['Overtime Hours']) || 0;
        const nightHours = parseFloat(row['Night Hours']) || 0;
        
        // Determine if weekend
        const date = new Date(row['Date']);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        
        // Calculate pay components
        const basePay = regularHours * settingsData.hourlyRate;
        const overtimePay = overtimeHours * settingsData.hourlyRate * settingsData.overtimeMultiplier;
        const nightAllowance = nightHours * settingsData.hourlyRate * settingsData.nightAllowance;
        const weekendAllowance = isWeekend ? regularHours * settingsData.hourlyRate * settingsData.weekendAllowance : 0;
        
        const grossPay = basePay + overtimePay + nightAllowance + weekendAllowance;
        
        // Calculate deductions
        const tax = grossPay * settingsData.taxRate;
        const pension = grossPay * settingsData.pensionRate;
        const totalDeductions = tax + settingsData.healthInsurance + pension;
        
        const netPay = grossPay - totalDeductions;
        
        return {
            'Employee ID': row['Employee ID'],
            'Date': row['Date'],
            'Department': row['Department'],
            'Regular Hours': regularHours.toFixed(2),
            'Overtime Hours': overtimeHours.toFixed(2),
            'Night Hours': nightHours.toFixed(2),
            'Base Pay': basePay.toFixed(2),
            'Overtime Pay': overtimePay.toFixed(2),
            'Night Allowance': nightAllowance.toFixed(2),
            'Weekend Allowance': weekendAllowance.toFixed(2),
            'Gross Pay': grossPay.toFixed(2),
            'Tax': tax.toFixed(2),
            'Insurance': settingsData.healthInsurance.toFixed(2),
            'Pension': pension.toFixed(2),
            'Total Deductions': totalDeductions.toFixed(2),
            'Net Pay': netPay.toFixed(2)
        };
    });
}

/**
 * Parse time string (HH:MM format)
 */
function parseTime(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.toString().split(':');
    return parseInt(parts[0]) + (parseInt(parts[1]) / 60);
}

/**
 * Calculate hours difference (handles overnight shifts)
 */
function calculateHoursDifference(clockIn, clockOut) {
    let diff = clockOut - clockIn;
    if (diff < 0) {
        diff += 24; // Handle overnight shift
    }
    return diff;
}

/**
 * Get status based on utilization and overtime
 */
function getStatus(utilization, overtime) {
    if (utilization < 80) return 'Low Utilization';
    if (overtime > 3) return 'Excessive Overtime';
    if (utilization >= 100) return 'Perfect';
    return 'Good';
}

/**
 * Update Dashboard View
 */
function updateDashboard() {
    // Calculate KPIs
    const uniqueEmployees = [...new Set(calculationsData.map(r => r['Employee ID']))];
    const totalHours = calculationsData.reduce((sum, r) => sum + parseFloat(r['Worked Hours'] || 0), 0);
    const totalOvertime = calculationsData.reduce((sum, r) => sum + parseFloat(r['Overtime Hours'] || 0), 0);
    const totalLostTime = calculationsData.reduce((sum, r) => sum + parseFloat(r['Lost Time'] || 0), 0);
    const nightShiftHours = calculationsData.reduce((sum, r) => sum + parseFloat(r['Night Hours'] || 0), 0);
    const avgUtilization = calculationsData.reduce((sum, r) => sum + parseFloat(r['Utilization'] || 0), 0) / calculationsData.length;
    
    const totalGrossPay = payrollData.reduce((sum, r) => sum + parseFloat(r['Gross Pay'] || 0), 0);
    const totalNetPay = payrollData.reduce((sum, r) => sum + parseFloat(r['Net Pay'] || 0), 0);
    
    // Update KPI cards
    document.getElementById('totalEmployees').textContent = uniqueEmployees.length;
    document.getElementById('totalHours').textContent = totalHours.toFixed(1);
    document.getElementById('totalGrossPay').textContent = formatCurrency(totalGrossPay);
    document.getElementById('avgUtilization').textContent = avgUtilization.toFixed(1) + '%';
    
    // Update metrics
    document.getElementById('totalOvertime').textContent = totalOvertime.toFixed(1) + ' hrs';
    document.getElementById('totalLostTime').textContent = totalLostTime.toFixed(1) + ' hrs';
    document.getElementById('nightShiftHours').textContent = nightShiftHours.toFixed(1) + ' hrs';
    document.getElementById('totalNetPay').textContent = formatCurrency(totalNetPay);
    
    // Update charts
    updateDepartmentChart();
    updateShiftChart();
    updateOvertimeChart();
    updatePaymentChart();
}

/**
 * Update Department Chart
 */
function updateDepartmentChart() {
    const ctx = document.getElementById('departmentChart');
    
    // Group by department
    const deptData = {};
    calculationsData.forEach(row => {
        const dept = row['Department'] || 'Unknown';
        if (!deptData[dept]) {
            deptData[dept] = 0;
        }
        deptData[dept] += parseFloat(row['Worked Hours'] || 0);
    });
    
    // Destroy existing chart if it exists
    if (charts.department) {
        charts.department.destroy();
    }
    
    charts.department = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(deptData),
            datasets: [{
                label: 'Total Hours',
                data: Object.values(deptData),
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(237, 100, 166, 0.8)',
                    'rgba(245, 87, 108, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * Update Shift Chart
 */
function updateShiftChart() {
    const ctx = document.getElementById('shiftChart');
    
    // Group by shift type
    const shiftData = {};
    calculationsData.forEach(row => {
        const shift = row['Shift Type'] || 'Unknown';
        if (!shiftData[shift]) {
            shiftData[shift] = 0;
        }
        shiftData[shift]++;
    });
    
    // Destroy existing chart if it exists
    if (charts.shift) {
        charts.shift.destroy();
    }
    
    charts.shift = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(shiftData),
            datasets: [{
                data: Object.values(shiftData),
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(237, 100, 166, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(79, 172, 254, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Update Overtime Chart
 */
function updateOvertimeChart() {
    const ctx = document.getElementById('overtimeChart');
    
    // Count employees by overtime range
    const ranges = {
        'No OT': 0,
        '0-2 hrs': 0,
        '2-4 hrs': 0,
        '4+ hrs': 0
    };
    
    // Group by employee and sum overtime
    const empOT = {};
    calculationsData.forEach(row => {
        const emp = row['Employee ID'];
        const ot = parseFloat(row['Overtime Hours'] || 0);
        empOT[emp] = (empOT[emp] || 0) + ot;
    });
    
    Object.values(empOT).forEach(ot => {
        if (ot === 0) ranges['No OT']++;
        else if (ot <= 2) ranges['0-2 hrs']++;
        else if (ot <= 4) ranges['2-4 hrs']++;
        else ranges['4+ hrs']++;
    });
    
    // Destroy existing chart if it exists
    if (charts.overtime) {
        charts.overtime.destroy();
    }
    
    charts.overtime = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(ranges),
            datasets: [{
                data: Object.values(ranges),
                backgroundColor: [
                    'rgba(25, 135, 84, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(253, 126, 20, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Update Payment Chart
 */
function updatePaymentChart() {
    const ctx = document.getElementById('paymentChart');
    
    // Calculate payment components
    const basePay = payrollData.reduce((sum, r) => sum + parseFloat(r['Base Pay'] || 0), 0);
    const overtimePay = payrollData.reduce((sum, r) => sum + parseFloat(r['Overtime Pay'] || 0), 0);
    const nightAllowance = payrollData.reduce((sum, r) => sum + parseFloat(r['Night Allowance'] || 0), 0);
    const weekendAllowance = payrollData.reduce((sum, r) => sum + parseFloat(r['Weekend Allowance'] || 0), 0);
    
    // Destroy existing chart if it exists
    if (charts.payment) {
        charts.payment.destroy();
    }
    
    charts.payment = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Base Pay', 'Overtime', 'Night Allowance', 'Weekend Allowance'],
            datasets: [{
                data: [basePay, overtimePay, nightAllowance, weekendAllowance],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(79, 172, 254, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Update Employees View
 */
function updateEmployeesView() {
    const tbody = document.getElementById('employeesTableBody');
    tbody.innerHTML = '';
    
    // Group data by employee
    const empData = {};
    calculationsData.forEach(row => {
        const empId = row['Employee ID'];
        if (!empData[empId]) {
            empData[empId] = {
                dept: row['Department'],
                hours: 0,
                overtime: 0,
                utilization: []
            };
        }
        empData[empId].hours += parseFloat(row['Worked Hours'] || 0);
        empData[empId].overtime += parseFloat(row['Overtime Hours'] || 0);
        empData[empId].utilization.push(parseFloat(row['Utilization'] || 0));
    });
    
    // Add payroll data
    const empPayroll = {};
    payrollData.forEach(row => {
        const empId = row['Employee ID'];
        if (!empPayroll[empId]) {
            empPayroll[empId] = { gross: 0, net: 0 };
        }
        empPayroll[empId].gross += parseFloat(row['Gross Pay'] || 0);
        empPayroll[empId].net += parseFloat(row['Net Pay'] || 0);
    });
    
    // Create table rows
    Object.keys(empData).forEach(empId => {
        const data = empData[empId];
        const avgUtil = data.utilization.reduce((a, b) => a + b, 0) / data.utilization.length;
        const payroll = empPayroll[empId] || { gross: 0, net: 0 };
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${empId}</strong></td>
            <td>${data.dept}</td>
            <td>${data.hours.toFixed(1)} hrs</td>
            <td>${data.overtime.toFixed(1)} hrs</td>
            <td>${avgUtil.toFixed(1)}%</td>
            <td>${formatCurrency(payroll.gross)}</td>
            <td>${formatCurrency(payroll.net)}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Update Payroll View
 */
function updatePayrollView() {
    // Update summary cards
    const totalGross = payrollData.reduce((sum, r) => sum + parseFloat(r['Gross Pay'] || 0), 0);
    const totalDeductions = payrollData.reduce((sum, r) => sum + parseFloat(r['Total Deductions'] || 0), 0);
    const totalNet = payrollData.reduce((sum, r) => sum + parseFloat(r['Net Pay'] || 0), 0);
    const totalHours = payrollData.reduce((sum, r) => sum + parseFloat(r['Regular Hours'] || 0) + parseFloat(r['Overtime Hours'] || 0), 0);
    const avgRate = totalHours > 0 ? totalGross / totalHours : 0;
    
    document.getElementById('payrollTotalGross').textContent = formatCurrency(totalGross);
    document.getElementById('payrollTotalDeductions').textContent = formatCurrency(totalDeductions);
    document.getElementById('payrollTotalNet').textContent = formatCurrency(totalNet);
    document.getElementById('payrollAvgRate').textContent = formatCurrency(avgRate);
    
    // Update table
    const tbody = document.getElementById('payrollTableBody');
    tbody.innerHTML = '';
    
    payrollData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${row['Employee ID']}</strong></td>
            <td>${row['Date']}</td>
            <td>${row['Regular Hours']}</td>
            <td>${row['Overtime Hours']}</td>
            <td>${formatCurrency(row['Base Pay'])}</td>
            <td>${formatCurrency(row['Overtime Pay'])}</td>
            <td>${formatCurrency(parseFloat(row['Night Allowance']) + parseFloat(row['Weekend Allowance']))}</td>
            <td>${formatCurrency(row['Gross Pay'])}</td>
            <td>${formatCurrency(row['Total Deductions'])}</td>
            <td><strong>${formatCurrency(row['Net Pay'])}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Update Reports View
 */
function updateReportsView() {
    // Department Summary
    const deptSummary = {};
    calculationsData.forEach(row => {
        const dept = row['Department'] || 'Unknown';
        if (!deptSummary[dept]) {
            deptSummary[dept] = {
                employees: new Set(),
                hours: 0
            };
        }
        deptSummary[dept].employees.add(row['Employee ID']);
        deptSummary[dept].hours += parseFloat(row['Worked Hours'] || 0);
    });
    
    const deptPayroll = {};
    payrollData.forEach(row => {
        const dept = row['Department'] || 'Unknown';
        if (!deptPayroll[dept]) {
            deptPayroll[dept] = 0;
        }
        deptPayroll[dept] += parseFloat(row['Gross Pay'] || 0);
    });
    
    const deptBody = document.getElementById('departmentSummaryBody');
    deptBody.innerHTML = '';
    Object.keys(deptSummary).forEach(dept => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${dept}</strong></td>
            <td>${deptSummary[dept].employees.size}</td>
            <td>${deptSummary[dept].hours.toFixed(1)} hrs</td>
            <td>${formatCurrency(deptPayroll[dept] || 0)}</td>
        `;
        deptBody.appendChild(tr);
    });
    
    // Shift Summary
    const shiftSummary = {};
    calculationsData.forEach(row => {
        const shift = row['Shift Type'] || 'Unknown';
        if (!shiftSummary[shift]) {
            shiftSummary[shift] = {
                employees: new Set(),
                hours: 0
            };
        }
        shiftSummary[shift].employees.add(row['Employee ID']);
        shiftSummary[shift].hours += parseFloat(row['Worked Hours'] || 0);
    });
    
    const shiftBody = document.getElementById('shiftSummaryBody');
    shiftBody.innerHTML = '';
    Object.keys(shiftSummary).forEach(shift => {
        const avgRate = shiftSummary[shift].hours > 0 ? 
            (deptPayroll[shift] || settingsData.hourlyRate * shiftSummary[shift].hours) / shiftSummary[shift].hours : 0;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${shift}</strong></td>
            <td>${shiftSummary[shift].hours.toFixed(1)} hrs</td>
            <td>${shiftSummary[shift].employees.size}</td>
            <td>${formatCurrency(avgRate)}</td>
        `;
        shiftBody.appendChild(tr);
    });
}

/**
 * Show specific view
 */
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected view
    const viewId = viewName + 'View';
    const view = document.getElementById(viewId);
    if (view) {
        view.style.display = 'block';
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.nav-link').classList.add('active');
}

/**
 * Export data to CSV
 */
function exportToCSV(type) {
    let data, filename;
    
    switch(type) {
        case 'employees':
            data = prepareEmployeeData();
            filename = 'employees_summary.csv';
            break;
        case 'payroll':
            data = payrollData;
            filename = 'payroll_data.csv';
            break;
        case 'summary':
            data = calculationsData;
            filename = 'calculations_summary.csv';
            break;
        default:
            return;
    }
    
    if (data.length === 0) {
        alert('No data to export!');
        return;
    }
    
    // Convert to CSV
    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';
    
    data.forEach(row => {
        const values = headers.map(header => {
            let value = row[header] || '';
            // Escape commas and quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

/**
 * Prepare employee summary data for export
 */
function prepareEmployeeData() {
    const empData = {};
    
    calculationsData.forEach(row => {
        const empId = row['Employee ID'];
        if (!empData[empId]) {
            empData[empId] = {
                'Employee ID': empId,
                'Department': row['Department'],
                'Total Hours': 0,
                'Overtime Hours': 0,
                'Utilization': []
            };
        }
        empData[empId]['Total Hours'] += parseFloat(row['Worked Hours'] || 0);
        empData[empId]['Overtime Hours'] += parseFloat(row['Overtime Hours'] || 0);
        empData[empId]['Utilization'].push(parseFloat(row['Utilization'] || 0));
    });
    
    // Add payroll data
    payrollData.forEach(row => {
        const empId = row['Employee ID'];
        if (empData[empId]) {
            if (!empData[empId]['Gross Pay']) {
                empData[empId]['Gross Pay'] = 0;
                empData[empId]['Net Pay'] = 0;
            }
            empData[empId]['Gross Pay'] += parseFloat(row['Gross Pay'] || 0);
            empData[empId]['Net Pay'] += parseFloat(row['Net Pay'] || 0);
        }
    });
    
    // Convert to array and format
    return Object.values(empData).map(emp => {
        const avgUtil = emp['Utilization'].reduce((a, b) => a + b, 0) / emp['Utilization'].length;
        return {
            'Employee ID': emp['Employee ID'],
            'Department': emp['Department'],
            'Total Hours': emp['Total Hours'].toFixed(2),
            'Overtime Hours': emp['Overtime Hours'].toFixed(2),
            'Avg Utilization': avgUtil.toFixed(1) + '%',
            'Gross Pay': (emp['Gross Pay'] || 0).toFixed(2),
            'Net Pay': (emp['Net Pay'] || 0).toFixed(2)
        };
    });
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    const value = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: settingsData.currency || 'USD'
    }).format(value);
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const uploadSection = document.getElementById('uploadSection');
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
        <i class="bi bi-check-circle-fill"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    uploadSection.querySelector('.card-body').appendChild(alert);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('ShiftGuard Dashboard initialized');
});
