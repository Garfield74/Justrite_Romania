# Justrite Romania Landing Page - Product Requirements Document

## Original Problem Statement
Create a feature-rich landing page for Justrite Romania S.R.L., an industrial safety solutions company. The page should include company information, product portfolio, downloadable resources, STUD-E Safety Survey section, and an AI-powered Safety Advisor chatbot.

## Recent Updates (Feb 4, 2025)
- **Logo Update:** Replaced text-based logo with new 50th anniversary Justrite Safety Group logo image in Navbar and Footer
- **Bug Fix:** Fixed translation file structure issue (sallAdvantage and industries were incorrectly nested in survey object)

## Company Details
- **Company**: JUSTRITE ROMANIA S.R.L.
- **Registry**: J17/1002/1998
- **Fiscal ID**: RO11196159
- **Address**: TULUCEȘTI, Nr. 1843C, județ GALAȚI
- **Email**: sales.ro@justrite.com
- **Phone**: 0236 325 301
- **Mobile**: +40 751 556 555

## Core Requirements

### 1. Landing Page Sections ✅ COMPLETED
- [x] Hero section with company branding
- [x] About Us section with vintage company image
- [x] Products section with 6 categories
- [x] Sall Advantage section
- [x] Statistics section
- [x] Mission section
- [x] Resources section with 7 PDF catalogues
- [x] STUD-E Survey section
- [x] Contact footer

### 2. Product Categories ✅ COMPLETED
1. Industrial Metal Containers
2. Liquid Containment Tank
3. Metal Pallets
4. Open Bottom Containers
5. Big Bag Holders
6. Waste & Plunger Cans

### 3. PDF Resources ✅ COMPLETED
Located in `/app/public/catalogues/`:
- Checkers-Cable-Management-Vehicle-Safety-Ground-Protection.pdf
- Hughes-Emergency-Safety-Showers-Eye-Washes.pdf
- Justrite-Industrial-Storage-Handling-Solutions-for-Hazardous-Materials.pdf
- Justrite-Safety-Cans-Material-Handling-Solutions.pdf
- NoTrax-Dust-Control-Entrance-Matting.pdf
- NoTrax-Ergonomic-Anti-Fatigue-Safety-Matting.pdf
- Sall-Materials-Storage-and-Handling-Essentials.pdf

### 4. AI Safety Advisor ✅ COMPLETED (Feb 3-4, 2025)
- [x] Floating chatbot button on page
- [x] Real-time streaming responses
- [x] Knowledge base from 7 PDF catalogues
- [x] OpenRouter API integration
- [x] Llama 3.1 70B Instruct model
- [x] Multi-turn conversation support
- [x] Contact information in responses
- [x] Quick Questions feature with 5 common queries
- [x] Chat History persistence via localStorage
- [x] Clear Chat button to start fresh conversation
- [x] Multi-language support (English/Romanian)

### 5. Multi-Language Support ✅ COMPLETED (Feb 4, 2025)
- [x] Language toggle button in navbar (Globe icon with EN/RO)
- [x] Complete translations for ALL sections:
  - Navigation menu
  - Hero section
  - About Us section (heritage, timeline, features)
  - Statistics section
  - Products section (6 categories with descriptions & features)
  - Resources section (catalogues, technical assistance)
  - STUD-E Safety Survey section (full form + process steps)
  - Mission section
  - Contact footer
  - AI Chatbot
- [x] Language preference persisted in localStorage
- [x] Instant UI updates when switching languages

### 6. Contact Form ✅ IMPROVED (Feb 4, 2025)
- [x] Enhanced form with Name, Email, Phone (optional), Subject, Message fields
- [x] Subject dropdown with 5 options: Quote, Product Info, Support, Partnership, Other
- [x] Form validation with visual error indicators (red border)
- [x] Loading state with spinner during submission
- [x] Success/Error feedback screens with appropriate icons
- [x] "Send Another Message" option after submission
- [x] Submissions stored in localStorage for reference
- [x] Multi-language support for all form elements
- [x] Mailto integration with formatted email body
  - Navigation menu
  - Hero section
  - AI Chatbot (title, quick questions, placeholder, disclaimer)
- [x] Language preference persisted in localStorage
- [x] Instant UI updates when switching languages

## Technical Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS (CDN)
- **Icons**: Lucide React
- **Port**: 3000

### AI Integration
- **Provider**: OpenRouter API
- **Model**: meta-llama/llama-3.1-70b-instruct
- **SDK**: OpenAI SDK (compatible with OpenRouter)
- **Knowledge Base**: Comprehensive product catalogue data

### Key Files
```
/app/
├── components/
│   ├── SafetyAssistant.tsx    # AI chatbot UI
│   ├── ProductSection.tsx      # Product grid
│   ├── ResourcesSection.tsx    # PDF downloads
│   └── ... (other sections)
├── services/
│   └── geminiService.ts        # OpenRouter RAG service
├── public/
│   └── catalogues/             # 7 PDF files
└── vite.config.ts              # Vite configuration
```

## Implementation Status

| Feature | Status | Date |
|---------|--------|------|
| Landing Page Structure | ✅ Complete | Jan 2025 |
| Product Section | ✅ Complete | Jan 2025 |
| Resources Section | ✅ Complete | Feb 2025 |
| STUD-E Survey | ✅ Complete | Feb 2025 |
| AI Safety Advisor | ✅ Complete | Feb 3, 2025 |

## Testing Status
- [x] Visual verification via screenshots
- [x] Chatbot response quality verified
- [x] Multi-turn conversation tested
- [x] Streaming responses working

## Credentials
- **OpenRouter API Key**: Configured in geminiService.ts
- **Model**: meta-llama/llama-3.1-70b-instruct

## Future Enhancements (Backlog)
- [ ] Backend email integration (Resend/SendGrid)
- [ ] Cookie consent banner for GDPR compliance
- [ ] Product detail pages
- [ ] Blog/News section

### 7. Analytics & SEO ✅ COMPLETED (Feb 4, 2025)

**SEO Optimization:**
- [x] Primary meta tags (title, description, keywords, author)
- [x] Open Graph tags for Facebook/social sharing
- [x] Twitter Card meta tags
- [x] Geo-location meta tags (Romania, Galați)
- [x] Structured Data (JSON-LD) for Organization
- [x] Structured Data (JSON-LD) for LocalBusiness
- [x] Canonical URL
- [x] Dynamic meta tags that update based on language (EN/RO)
- [x] HTML lang attribute updates with language change

**Analytics Tracking (Google Analytics 4):**
- [x] Page view tracking
- [x] Section scroll tracking (intersection observer)
- [x] PDF catalogue download tracking
- [x] Contact form submission tracking
- [x] Phone/email click tracking
- [x] Chatbot open/close/message tracking
- [x] Language change tracking
- [x] Survey form submission tracking

**Files Created:**
- `/app/utils/analytics.ts` - Analytics utility functions
- `/app/components/SEOHead.tsx` - Dynamic SEO component

### 8. Vercel Deployment Support ✅ COMPLETED (Feb 12, 2025)

**Problem Solved:**
The application had a FastAPI backend that couldn't run on Vercel's static/serverless platform. Converted to Vercel Serverless Functions.

**Changes Made:**
- [x] Created `/app/api/contact.py` - Serverless function for contact form
- [x] Created `/app/api/survey.py` - Serverless function for survey form
- [x] Created `/app/api/health.py` - Health check endpoint
- [x] Created `/app/vercel.json` - Vercel deployment configuration
- [x] Created `/app/.env.example` - Example environment variables
- [x] Updated `/app/.gitignore` - Proper ignore patterns for deployment

**Vercel Configuration:**
- Framework: Vite
- Build Command: `yarn build`
- Output Directory: `dist`
- Serverless Runtime: Python 3.9

**Required Environment Variable (set in Vercel Dashboard):**
```
VITE_OPENROUTER_API_KEY=your_api_key_here
```

**Note:** Form submissions are logged to Vercel's serverless logs. For persistent storage, integrate with a database service like Vercel KV, MongoDB Atlas, or similar.

---

## Updated Architecture

```
/app/
├── api/                          # Vercel Serverless Functions
│   ├── contact.py                # Contact form handler
│   ├── survey.py                 # Survey form handler
│   └── health.py                 # Health check endpoint
├── backend/                      # Local development only
│   └── server.py                 # FastAPI (for local dev)
├── components/                   # React components
├── services/
│   └── geminiService.ts          # AI advisor (needs renaming)
├── public/
│   └── catalogues/               # PDF files
├── vercel.json                   # Vercel config
├── .env.example                  # Environment template
└── vite.config.ts                # Vite configuration
```

## Deployment Checklist

### For Vercel:
1. Push code to GitHub via "Save to Github"
2. Import project in Vercel Dashboard
3. Add Environment Variable: `VITE_OPENROUTER_API_KEY`
4. Deploy

### Environment Variables Required:
| Variable | Description | Where to Set |
|----------|-------------|--------------|
| VITE_OPENROUTER_API_KEY | OpenRouter API key for AI chatbot | Vercel Dashboard → Settings → Environment Variables |

## Backlog / Future Tasks
- [ ] Rename `geminiService.ts` to `aiAdvisorService.ts`
- [ ] Add persistent storage for form submissions (Vercel KV/MongoDB)
- [ ] Add feedback mechanism to chatbot responses
- [ ] Replace placeholder Google Analytics ID
