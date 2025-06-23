# Orbital Vision - Space Station Object Detection

A modern React application built for the Duality AI Space Station Hackathon with YOLOv8 integration for space station equipment detection.

## Mission Objectives

- ✅ Space-themed glassmorphism UI with orbital animations
- ✅ YOLOv8 object detection for space station equipment
- ✅ Detection of: Toolboxes, Oxygen Tanks, Fire Extinguishers
- ✅ mAP@0.5 performance metrics display
- ✅ Falcon digital twin simulation integration ready
- ✅ Mission-critical responsive design

## Innovation Features

- 🚀 **Live Camera Detection**: Real-time video stream processing with continuous monitoring
- 🎨 **Blur & Color Intelligence**: Advanced image processing for motion blur and color-based classification
- 🧠 **Adaptive Learning**: Self-improving AI that learns equipment placement patterns over time
- 🗺️ **Spatial Intelligence**: 3D mapping and predictive object location based on usage patterns
- ⚡ **Performance Optimization**: Continuous model refinement and accuracy improvements
- 📍 **Temporal Analysis**: Time-based predictions for equipment availability and needs

## Mission Technology

### Frontend
- React 18 with TypeScript (Mission Interface)
- Vite for rapid deployment
- Tailwind CSS for space-grade styling
- Framer Motion for orbital animations
- TanStack Query for data pipeline management
- Wouter for navigation

### AI Detection System
- YOLOv8 object detection model
- Space station equipment classification
- mAP@0.5 performance metrics
- Falcon digital twin integration ready
- Express.js API server with TypeScript

### UI Components
- Shadcn/ui component library
- Lucide React icons for space theme
- React Icons for technology display

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

- `POST /api/predict` - Upload station imagery for equipment detection
- `GET /api/health` - System operational status

## YOLOv8 Integration

To integrate with your YOLOv8 space station model:

1. Update the API endpoint in `client/src/components/Demo.tsx` to point to your trained model
2. Ensure response format matches the space station object schema
3. Configure for: toolbox, oxygen_tank, fire_extinguisher detection
4. Include mAP@0.5 scores in responses for performance tracking

## Duality AI Hackathon

This application is designed for the Duality AI Space Station Hackathon requirements:
- Detects the three required object categories
- Displays mAP@0.5 performance metrics
- Ready for Falcon digital twin integration
- Professional documentation and presentation ready

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