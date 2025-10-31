# ShiftGuard Web Dashboard - Installation Guide

## Zero Installation Required! 🎉

The ShiftGuard Web Dashboard requires **NO installation**. It runs entirely in your web browser!

## Quick Start (30 Seconds)

### Step 1: Locate the Dashboard
Navigate to the `web-dashboard` folder in your file explorer.

### Step 2: Open the Dashboard
Double-click `index.html` - it will open in your default web browser.

### Step 3: Upload Data
1. Click the **"Choose File"** button
2. Select your Excel file or use `demo-data.csv` for testing
3. Click **"Load Data"**
4. Explore your dashboard!

That's it! You're done! 🚀

---

## Detailed Instructions

### For Windows Users

1. **Open File Explorer**
   - Navigate to the project folder
   - Go to `web-dashboard` folder

2. **Open the Dashboard**
   - Double-click `index.html`
   - OR right-click → "Open with" → Choose your preferred browser

3. **If Double-Click Doesn't Work**
   - Right-click `index.html`
   - Select "Open with"
   - Choose: Chrome, Firefox, Edge, or Opera
   - Check "Always use this app" (optional)

### For Mac Users

1. **Open Finder**
   - Navigate to the project folder
   - Go to `web-dashboard` folder

2. **Open the Dashboard**
   - Double-click `index.html`
   - OR right-click → "Open With" → Choose your browser

3. **If Double-Click Doesn't Work**
   - Right-click `index.html`
   - Select "Open With"
   - Choose: Chrome, Firefox, Safari, or Opera

### For Linux Users

1. **Open File Manager**
   - Navigate to the project folder
   - Go to `web-dashboard` folder

2. **Open the Dashboard**
   - Double-click `index.html`
   - OR right-click → "Open With" → Choose your browser

3. **Alternative: Use Command Line**
   ```bash
   cd web-dashboard
   xdg-open index.html
   ```

---

## Browser Recommendations

### Best Experience
- **Google Chrome** (Recommended) - Latest version
- **Mozilla Firefox** - Latest version
- **Microsoft Edge** - Latest version

### Also Supported
- Safari 14+
- Opera 76+
- Brave Browser
- Vivaldi

### Not Recommended
- Internet Explorer (discontinued)
- Very old browser versions

---

## Testing the Dashboard

### Option 1: Use Demo Data (Fastest)

1. Open `index.html`
2. Click "Choose File"
3. Select `demo-data.csv` (in the same folder)
4. Click "Load Data"
5. See instant results!

### Option 2: Use Sample Excel File

1. Open `index.html`
2. Click "Choose File"
3. Navigate to: `../ShiftGuard_Complete_System/Excel_Files/`
4. Select `ShiftGuard_System.xlsx`
5. Click "Load Data"
6. Explore the full dashboard!

### Option 3: Use Your Own Data

1. Prepare your Excel file with BiometricData sheet
2. Open `index.html`
3. Click "Choose File"
4. Select your file
5. Click "Load Data"
6. View your data visualized!

---

## System Requirements

### Hardware
- **Processor**: Any modern CPU (no special requirements)
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 10MB for dashboard files
- **Internet**: Only needed for initial library load (CDN)

### Software
- **Operating System**: Windows 7+, macOS 10.12+, Linux (any)
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Excel**: NOT required! (but can use Excel files)
- **Other Software**: None required

### Internet Connection
- **Initial Load**: Internet needed to load libraries (Bootstrap, Chart.js, SheetJS)
- **After First Load**: Can work offline if browser caches resources
- **For Air-Gapped Systems**: Can download libraries locally (advanced)

---

## Troubleshooting Installation Issues

### Dashboard Won't Open

**Problem**: Double-clicking does nothing

**Solutions**:
1. Right-click → "Open with" → Choose a browser
2. Open your browser first, then drag `index.html` into it
3. Set `.html` files to open with a browser by default

### Wrong Browser Opens

**Problem**: Opens in old or unsupported browser

**Solutions**:
1. Right-click `index.html`
2. Select "Open with"
3. Choose a modern browser
4. Check "Always open with this app"

### File Access Denied

**Problem**: Permission error when opening

**Solutions**:
1. Check file permissions (shouldn't be read-only)
2. Move folder to your Documents or Desktop
3. Run browser as administrator (Windows)

### Nothing Loads

**Problem**: Blank page after opening

**Solutions**:
1. Check internet connection (for CDN libraries)
2. Disable ad blockers or allow CDN domains
3. Try a different browser
4. Check browser console (F12) for errors

---

## Advanced: Running from a Web Server

While not required, you can serve the dashboard from a web server.

### Python (Built-in)

```bash
# Python 3
cd web-dashboard
python3 -m http.server 8080

# Then open: http://localhost:8080
```

### Node.js (If Installed)

```bash
# Install http-server globally
npm install -g http-server

# Run in web-dashboard folder
cd web-dashboard
http-server -p 8080

# Then open: http://localhost:8080
```

### PHP (If Installed)

```bash
cd web-dashboard
php -S localhost:8080

# Then open: http://localhost:8080
```

---

## Network Sharing

### Share with Team Members

**Option 1: Network Drive**
1. Copy `web-dashboard` folder to shared network drive
2. Team members open `index.html` from network location
3. Each user uploads their own data

**Option 2: ZIP and Email**
1. Right-click `web-dashboard` folder
2. Select "Send to" → "Compressed (zipped) folder"
3. Email the ZIP file
4. Recipients extract and open `index.html`

**Option 3: Intranet Server**
1. Copy folder to your web server
2. Share the URL (e.g., http://intranet/shiftguard/)
3. Users access via browser
4. Each user uploads their data (client-side only)

---

## Security Notes

### Data Privacy
- ✅ All data processing happens in YOUR browser
- ✅ No data sent to any server
- ✅ No data stored permanently
- ✅ Files read locally from your computer
- ✅ Safe to use with confidential data

### Network Considerations
- Dashboard files are safe to share
- Data files should be shared securely (as with any sensitive files)
- Consider encryption when emailing data files
- Use secure network drives for shared access

---

## Updating the Dashboard

### Future Updates

When new versions are released:

1. **Download** the new version
2. **Backup** your current `web-dashboard` folder (optional)
3. **Replace** the old folder with the new one
4. **Your data files are separate** - no need to move them
5. **Open** the new `index.html` as before

---

## Uninstallation

### To Remove the Dashboard

Simply delete the `web-dashboard` folder - that's it!

No registry entries, no system files, no traces left behind.

---

## Getting Help

### Resources
1. **README.md** - Technical documentation
2. **USAGE_GUIDE.md** - User guide with examples
3. **WEB_DASHBOARD_GUIDE.md** - Quick start overview
4. **Browser Console** - Press F12 to see error messages

### Common Issues
- Check browser compatibility
- Ensure internet connection for first load
- Verify file permissions
- Try incognito/private mode
- Test with demo-data.csv first

### Still Stuck?
1. Test with `demo-data.csv` - if this works, your data file may have issues
2. Try a different browser
3. Check the browser console (F12) for specific errors
4. Review the USAGE_GUIDE.md troubleshooting section

---

## Summary

✅ **No installation required**  
✅ **Just open index.html in browser**  
✅ **Works on Windows, Mac, Linux**  
✅ **No admin rights needed**  
✅ **No software dependencies**  
✅ **Ready to use in 30 seconds**  

---

**Need more help?** See [USAGE_GUIDE.md](USAGE_GUIDE.md) for detailed instructions!

**Ready to start?** Double-click `index.html` now! 🚀
