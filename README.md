# APIPeek - Peek Inside Your APIs

APIPeek is a beautiful API testing and visualization tool that lets you paste any REST API URL and instantly preview your data with stunning visual cards, generate production-ready code snippets in Fetch or Axios, and intelligently extract nested data structures using AI-powered analysis.

## Features

- **Instant API Preview** - Drop any API URL and instantly peek inside your data
- **Beautiful Data Visualization** - Transform API responses into stunning visual cards with smart layouts
- **Code Generation** - Generate production-ready code in Fetch or Axios with async/await or promise syntax
- **AI-Powered Data Extraction** - Intelligently extract and visualize deeply nested API responses
- **One-Click Copy** - Copy optimized code snippets with comprehensive error handling
- **Real-Time Preview** - See your data displayed in multiple formats (Cards, JSON)

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: Zustand, React Query
- **Animations**: Motion
- **API Integration**: Axios
- **Code Highlighting**: React Syntax Highlighter
- **AI Analysis**: Google Generative AI (Gemini)
- **Backend**: Node.js Express (for securing Gemini API key)

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page-level components (Home, API Craft, Error)
├── hooks/           # Custom React hooks
├── services/        # API and AI service integration
├── store/           # Zustand state management
├── utils/           # Utility functions
├── animations/      # Motion animations
├── content/         # Static content and configuration
└── layout/          # Layout wrapper
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd apipeek
```

2. Install frontend dependencies
```bash
npm install
```

3. Set up backend for API key security (Optional but recommended)
```bash
cd server
npm install
```

4. Create environment variables
```bash
# Frontend (.env)
VITE_GITHUB=<your-github-url>
VITE_LINKED=<your-linkedin-url>
VITE_MAIL_TO=<your-email>

# Backend (server/.env)
GEMINI_API_KEY=<your-gemini-api-key>
```

## Usage

1. **Paste an API URL** - Enter any API endpoint in the search bar
2. **Choose Your Method** - Select between Fetch or Axios
3. **Select Syntax** - Choose async/await or promise-based syntax
4. **Preview Data** - View your API response as beautiful cards or raw JSON
5. **Use AI (Optional)** - Click AI button to intelligently extract nested data
6. **Copy Code** - One-click copy of the generated code snippet

## Backend Security

The backend Node.js/Express server securely handles the Gemini API key to prevent exposing credentials in the frontend. All AI analysis requests are proxied through the backend endpoint `/api/analyze-api`.

## Key Features Explained

### AI Data Extraction
Intelligently analyzes complex API responses and extracts multiple datasets from deeply nested structures using advanced prompting techniques.

### Infinite Scrolling
Efficiently renders large datasets with lazy loading and intersection observer for smooth performance.

### Code Snippet Generation
Generates production-ready code with:
- Error handling
- Proper HTTP status checking
- Console error logging
- Both async/await and promise-based patterns

### Beautiful Cards
Smart card rendering that automatically detects and displays:
- Images/thumbnails
- Titles and descriptions
- Prices and categories
- Custom email fields

## Author

Built with ❤️ for developers who want to peek inside their APIs instantly.
