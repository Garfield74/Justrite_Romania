<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Justrite Romania Banner" width="1200" height="475" />
</div>

# Justrite Romania - Industrial Safety Solutions

A high-performance landing page and digital catalogue for **Justrite Romania S.R.L.**, featuring an AI-powered Safety Assistant. This application showcases industrial safety products, provides downloadable resources, and offers interactive tools like the STUD-E Safety Survey.

## 🚀 Key Features

*   **Comprehensive Product Catalogue:** Detailed sections for 6 major product categories including Safety Cans, Spill Containment, and Ergonomic Matting.
*   **AI Safety Advisor:** An intelligent chatbot powered by **Google Gemini 1.5 Flash**. It provides instant answers based on a comprehensive knowledge base of 7 product catalogues and Romanian safety regulations.
    *   Real-time streaming responses.
    *   Multi-turn conversation support.
    *   Multi-language (English/Romanian) support.
    *   Persisted chat history.
*   **Multi-Language Support:** Full English and Romanian translations for all content, including the AI chatbot and forms.
*   **Interactive Tools:**
    *   **STUD-E Safety Survey:** A guided assessment tool for workplace safety needs.
    *   **Resource Library:** Downloadable PDF catalogues for all product lines.
*   **Modern UI/UX:** Responsive design built with React, Tailwind CSS, and Lucide icons.
*   **SEO Optimized:** Dynamic meta tags, Open Graph support, and structured data for better search visibility.
*   **Analytics:** Integrated tracking for user interactions, downloads, and form submissions.
*   **Serverless Backend:** Python-based Vercel Functions for handling contact forms and survey submissions.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React 19](https://react.dev/) with TypeScript
*   **Build Tool:** [Vite 6](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration:** [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (Gemini 1.5 Flash)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Deployment:** Vercel (Frontend + Serverless Functions)
*   **Backend Runtime:** Python 3.9 (for API routes)

## 📋 Prerequisites

*   **Node.js:** v18 or higher recommended.
*   **yarn:** (or npm/pnpm).
*   **Google Gemini API Key:** Required for the AI chatbot. Get one from [Google AI Studio](https://aistudio.google.com/).

## 💻 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/justrite-romania.git
    cd justrite-romania
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    VITE_GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    yarn dev
    ```
    Access the app at `http://localhost:5173`.

5.  **Build for Production:**
    ```bash
    yarn build
    ```
    The output will be in the `dist` folder.

## 📂 Project Structure

```
/app/
├── api/                    # Vercel Serverless Functions (Python)
│   ├── contact.py          # Contact form handler
│   ├── survey.py           # Survey submission handler
│   └── health.py           # Health check endpoint
├── components/             # React UI Components
│   ├── SafetyAssistant.tsx # AI Chatbot implementation
│   ├── ProductSection.tsx  # Product catalogue grid
│   ├── ...                 # Other section components
├── i18n/                   # Internationalization
│   ├── translations.ts     # EN/RO translation strings
│   └── ...                 # Context providers
├── public/                 # Static Assets
│   └── catalogues/         # PDF Product Catalogues
├── services/
│   └── geminiService.ts    # Google Gemini AI integration service
├── utils/                  # Utility functions (Analytics, etc.)
├── App.tsx                 # Main application entry
├── main.tsx                # React DOM rendering
└── vite.config.ts          # Vite configuration
```

## 🎨 Customization

This project is designed to be easily customized. For detailed instructions on how to update content, images, contact details, or the AI's behavior, please refer to the **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)**.

**Quick Customization Tips:**
*   **Contact Info:** Edit `components/ContactFooter.tsx`.
*   **AI Knowledge Base:** Update `PRODUCT_KNOWLEDGE_BASE` in `services/geminiService.ts`.
*   **Translations:** Modify `i18n/translations.ts`.
*   **Colors:** Update the Tailwind config in `index.html` (or `tailwind.config.js` if extracted).

## 🚀 Deployment

The project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will automatically detect the Vite framework and Python API routes.
4.  **Important:** Add the `VITE_GEMINI_API_KEY` environment variable in the Vercel Project Settings.
5.  Deploy!

## 📄 License

Copyright © 2025 Justrite Romania S.R.L. All rights reserved.
