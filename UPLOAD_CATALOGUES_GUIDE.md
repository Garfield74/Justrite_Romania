# How to Upload Your Product Catalogues

## 📁 Where to Place Your PDF Files

All PDF catalogues should be placed in:
```
/app/public/catalogues/
```

## 📝 Required File Names

Please rename your PDF files to match these exact names:

1. **Sall Catalogue:**
   - `Sall-Materials-Storage-and-Handling-Essentials.pdf`

2. **Justrite Industrial Storage:**
   - `Justrite-Industrial-Storage-Handling-Solutions-for-Hazardous-Materials.pdf`

3. **Justrite Safety Cans:**
   - `Justrite-Safety-Cans-Material-Handling-Solutions.pdf`

4. **NoTrax Ergonomic:**
   - `NoTrax-Ergonomic-Anti-Fatigue-Safety-Matting.pdf`

5. **NoTrax Dust Control:**
   - `NoTrax-Dust-Control-Entrance-Matting.pdf`

6. **Hughes Emergency Equipment:**
   - `Hughes-Emergency-Safety-Showers-Eye-Washes.pdf`

7. **Checkers:**
   - `Checkers-Cable-Management-Vehicle-Safety-Ground-Protection.pdf`

## 🚀 Upload Methods

### Method 1: Using File Manager (If Available)
1. Navigate to `/app/public/catalogues/`
2. Upload your PDF files
3. Ensure they match the exact names above

### Method 2: Using Command Line
```bash
# Navigate to the catalogues folder
cd /app/public/catalogues/

# Copy your files here with the correct names
# Example:
cp /path/to/your/sall-catalogue.pdf Sall-Materials-Storage-and-Handling-Essentials.pdf
```

### Method 3: Direct Upload to Project
If you're uploading through your development environment:
1. Place all PDFs in `/app/public/catalogues/`
2. Commit and push to your repository
3. The files will be automatically deployed

## ✅ Verification

After uploading, your catalogues will be accessible at:
- `https://your-domain.com/catalogues/[filename].pdf`

For example:
- `https://justrite-preview.preview.emergentagent.com/catalogues/Sall-Materials-Storage-and-Handling-Essentials.pdf`

## 🎨 How It Appears on the Website

The Resources section displays:
- **7 catalogue cards** organized by brand
- Each card shows:
  - Brand name with color-coded badge
  - Catalogue title
  - Brief description
  - Download button
  - PDF document indicator

## 📊 File Requirements

- **Format:** PDF only
- **Size:** Recommended under 10MB per file for fast downloads
- **Naming:** Must match exactly (case-sensitive)
- **Location:** Must be in `/app/public/catalogues/`

## 🔧 Troubleshooting

**If a download link doesn't work:**
1. Check the filename matches exactly
2. Ensure the file is in `/app/public/catalogues/`
3. Clear browser cache and try again
4. Check file permissions (should be readable)

**Common Issues:**
- ❌ Wrong folder: Files in `/app/` instead of `/app/public/catalogues/`
- ❌ Wrong name: Spaces or special characters not matching
- ❌ Wrong extension: File is .PDF (uppercase) instead of .pdf (lowercase)

## 💡 Tips

- Use descriptive names but stick to the format provided
- Compress PDFs before uploading if they're very large
- Test each download link after uploading
- Keep backup copies of all catalogues

## 📞 Need Help?

If you encounter any issues uploading the catalogues, please let me know and I'll assist you directly!
