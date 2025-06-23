# AI Vision - Object Detection App

A modern React application with Flask backend integration for real-time object detection using YOLOv8.

## Features

- ✅ Modern glassmorphism UI with smooth animations
- ✅ YOLOv8 object detection API integration
- ✅ Drag & drop image upload functionality
- ✅ Real-time detection results display
- ✅ Responsive design with Framer Motion animations
- ✅ Professional UI/UX with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- TanStack Query for API state management
- Wouter for routing

### Backend
- Express.js server
- Multer for file upload handling
- TypeScript support
- Mock prediction endpoints (ready for Flask integration)

### UI Components
- Shadcn/ui component library
- Lucide React icons
- React Icons for tech stack logos

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Extract the zip file
2. Open terminal/command prompt in the project root directory (where package.json is located)
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   
   **For Windows Command Prompt:**
   ```cmd
   start-windows.bat
   ```
   
   **For Windows PowerShell:**
   ```powershell
   .\start-powershell.ps1
   ```
   
   **For Unix/Linux/macOS:**
   ```bash
   chmod +x start-unix.sh
   ./start-unix.sh
   ```
   
   **Manual Commands (if scripts don't work):**
   ```cmd
   # Windows Command Prompt
   set NODE_ENV=development && npx tsx server/index.ts
   
   # Windows PowerShell (run these separately)
   $env:NODE_ENV="development"
   npx tsx server/index.ts
   
   # Unix/Linux/macOS
   NODE_ENV=development npx tsx server/index.ts
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility libraries
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
└── public/                 # Static assets
```

## API Endpoints

- `POST /api/predict` - Upload image for object detection
- `GET /api/health` - Health check endpoint

## Flask Integration

To integrate with your existing Flask + YOLOv8 backend:

1. Update the API endpoint in `client/src/components/Demo.tsx`
2. Modify the prediction request format to match your Flask API
3. Update the response handling for your specific prediction format

## Customization

The application uses CSS variables for theming. Customize colors in `client/src/index.css`:

```css
:root {
  --primary: hsl(207, 90%, 54%);
  --secondary: hsl(60, 4.8%, 95.9%);
  /* ... other variables */
}
```

## Deployment

The application is configured for deployment on Replit with automatic build and serve capabilities.

## License

MIT License - feel free to use this project for your own applications.