# Justrite Romania Landing Page - Customization Guide

This guide will help you customize and maintain your Justrite Romania landing page.

## 📁 Project Structure

```
/app/
├── components/           # All React components
│   ├── Navbar.tsx       # Top navigation bar
│   ├── Hero.tsx         # Main banner section
│   ├── AboutSection.tsx # Company history & info
│   ├── StatisticsSection.tsx # Stats (118 years, etc.)
│   ├── ProductSection.tsx # Product catalog
│   ├── SallAdvantageSection.tsx # Sall brand info
│   ├── IndustriesSection.tsx # Industries served
│   ├── MissionSection.tsx # Mission statement
│   ├── SafetyAssistant.tsx # AI chatbot
│   └── ContactFooter.tsx # Footer with contact info
├── services/
│   └── geminiService.ts # AI chatbot service
├── App.tsx              # Main app component
├── index.html           # HTML entry point
└── .env.local           # Environment variables (API keys)
```

## 🔧 How to Update Contact Information

### Email Address
**File:** `/app/components/ContactFooter.tsx`

**Find and replace:**
```typescript
// Current email
sales.romania@buyjustrite.eu

// Update this line (around line 61):
<a href="mailto:sales.romania@buyjustrite.eu" ...>
  sales.romania@buyjustrite.eu
</a>

// And in the form submit (around line 85):
window.location.href = `mailto:sales.romania@buyjustrite.eu?subject=...`;
```

**Also update in:** `/app/services/geminiService.ts` (line 15)
```typescript
If asked about pricing or specific orders, advise the user to contact: sales.romania@buyjustrite.eu
```

### Phone Number
**File:** `/app/components/ContactFooter.tsx`

**Find and replace (around line 57):**
```typescript
<a href="tel:+40236325301" ...>
  0236 325 301
</a>
```

**Also update in:** `/app/services/geminiService.ts` (line 15)
```typescript
or call 0236 325 301
```

### Physical Address
**File:** `/app/components/ContactFooter.tsx`

**Find and replace (around line 49-53):**
```typescript
<span>
  TULUCEȘTI, Nr. 1843C,<br />
  județ GALAȚI,<br />
  Romania
</span>
```

### Company Registration Details
**File:** `/app/components/ContactFooter.tsx`

**Find and replace (around line 102-104):**
```typescript
<p className="font-semibold text-gray-400 mb-1">JUSTRITE ROMANIA S.R.L.</p>
<p>National Registry Registration Number: J17/1002/1998</p>
<p>Fiscal ID: RO11196159</p>
```

## 🖼️ How to Replace Images

### Hero Section Background
**File:** `/app/components/Hero.tsx`

**Update (line 8-10):**
```typescript
<img
  className="w-full h-full object-cover opacity-30"
  src="YOUR_NEW_IMAGE_URL_HERE"
  alt="Industrial Safety Solutions"
/>
```

### Product Images
**File:** `/app/components/ProductSection.tsx`

**Find the products array (starts around line 6) and update imageUrl:**
```typescript
const products: Product[] = [
  {
    id: 'safety-cans',
    title: 'Safety Cans & Cabinets',
    description: '...',
    imageUrl: 'YOUR_NEW_IMAGE_URL', // Change this
    features: [...]
  },
  // ... repeat for each product
];
```

### About Section Image
**File:** `/app/components/AboutSection.tsx`

**Update (around line 74):**
```typescript
<img
  src="YOUR_NEW_IMAGE_URL"
  alt="Justrite Manufacturing Heritage"
  className="..."
/>
```

### Sall Advantage Section Image
**File:** `/app/components/SallAdvantageSection.tsx`

**Update (around line 77):**
```typescript
<img
  src="YOUR_NEW_IMAGE_URL"
  alt="Italian Manufacturing Excellence"
  className="..."
/>
```

## 📝 How to Update Text Content

### Company Name/Branding
**Files to update:**
- `/app/components/Navbar.tsx` (line 22-24)
- `/app/components/ContactFooter.tsx` (line 13-16)
- `/app/index.html` (line 6 - page title)

### Hero Section Headline
**File:** `/app/components/Hero.tsx` (line 18-21)
```typescript
<h1 className="..." data-testid="hero-heading">
  Industrial Safety Solutions <br />
  <span className="text-brand-yellow">for Romanian Workplaces</span>
</h1>
```

### Mission Statement
**File:** `/app/components/MissionSection.tsx`
Update the entire section starting around line 9.

## 🎨 How to Change Colors

The brand colors are defined in `/app/index.html` in the Tailwind configuration:

**Update colors (line 11-18):**
```javascript
colors: {
  brand: {
    yellow: '#D32F2F', // Main brand color (currently red)
    black: '#1A1A1A',  // Dark backgrounds
    gray: '#4A4A4A',   // Text gray
    red: '#D32F2F'     // Accent color
  }
}
```

**Color usage throughout the site:**
- `text-brand-yellow` - Yellow/red accent text
- `bg-brand-yellow` - Yellow/red backgrounds
- `text-brand-black` - Dark text
- `bg-brand-black` - Dark backgrounds
- `text-brand-red` - Red accent text

## 🤖 How to Update AI Chatbot

### Change AI Responses/Instructions
**File:** `/app/services/geminiService.ts`

**Update the system instruction (line 9-22):**
```typescript
const SAFETY_SYSTEM_INSTRUCTION = `
You are the "Justrite Safety Advisor"...
[Modify this text to change how the AI responds]
`;
```

### Change Welcome Message
**File:** `/app/components/SafetyAssistant.tsx`

**Update (line 11-13):**
```typescript
{
  role: MessageRole.MODEL,
  text: "YOUR NEW WELCOME MESSAGE HERE"
}
```

### Update Button Text
**File:** `/app/components/SafetyAssistant.tsx` (line 92)
```typescript
<span className="...">
  Ask Safety AI  // Change this text
</span>
```

## 🏷️ How to Add/Remove Products

**File:** `/app/components/ProductSection.tsx`

**Add a new product to the array (starting line 6):**
```typescript
const products: Product[] = [
  // ... existing products ...
  {
    id: 'new-product-id',
    title: 'New Product Name',
    description: 'Product description here...',
    imageUrl: 'https://your-image-url.com/image.jpg',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  }
];
```

**To remove a product:** Simply delete its entry from the array.

## 🌐 How to Add/Change Social Media Links

**File:** `/app/components/ContactFooter.tsx`

**Update (around line 22-28):**
```typescript
<a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" ...>
  <Linkedin className="h-6 w-6" />
</a>
<a href="YOUR_FACEBOOK_URL" target="_blank" rel="noopener noreferrer" ...>
  <Facebook className="h-6 w-6" />
</a>
```

## 🔨 How to Run the Project Locally

1. **Install dependencies:**
   ```bash
   cd /app
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **View in browser:**
   Open `http://localhost:5173` in your web browser

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📊 Navigation Links

To add or modify navigation menu items:

**File:** `/app/components/Navbar.tsx` (line 7-13)

```typescript
const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Safety Assistant', href: '#safety-assistant' },
  { name: 'Contact', href: '#contact' },
  // Add new links here
];
```

## 🔑 Environment Variables

**File:** `/app/.env.local`

To enable the AI chatbot, you need to set your Gemini API key.

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

You can obtain a key from [Google AI Studio](https://aistudio.google.com/).

## 💡 Tips

1. **Always test changes locally** before deploying
2. **Keep backups** of files before making major changes
3. **Image optimization:** Use compressed images (under 500KB) for faster loading
4. **Consistent formatting:** Maintain the existing code style
5. **Mobile testing:** Always check how changes look on mobile devices

## 🐛 Common Issues

### AI Chatbot Not Working
- Check that `.env.local` file exists with the correct API key (`VITE_GEMINI_API_KEY`)
- Restart the development server after changing `.env.local`

### Images Not Loading
- Verify the image URL is publicly accessible
- Check for HTTPS (not HTTP) URLs
- Ensure proper image format (JPG, PNG, WebP)

### Styling Issues
- Clear browser cache
- Check Tailwind class names are correct
- Verify no conflicting CSS

## 📞 Need Help?

If you need assistance with customization:
1. Check this guide first
2. Review the component files mentioned
3. Test changes in a local development environment
4. Contact your development team for advanced customizations

---

**Last Updated:** January 2025
**Version:** 1.0
