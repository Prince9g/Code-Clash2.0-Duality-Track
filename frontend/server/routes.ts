import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, JPG, PNG, WEBP) are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }

  // Object detection endpoint
  app.post('/api/predict', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'No image file provided',
          message: 'Please upload an image file (JPEG, JPG, PNG, WEBP)' 
        });
      }

      // Here we would normally call the YOLOv8 Flask backend
      // For now, we'll simulate space station object detection
      // TODO: Replace with actual Flask API call to YOLOv8 model endpoint
      
      const mockPredictions = [
        { class: 'toolbox', confidence: 0.892, map_score: 0.85 },
        { class: 'oxygen_tank', confidence: 0.946, map_score: 0.91 },
        { class: 'fire_extinguisher', confidence: 0.823, map_score: 0.78 }
      ];

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      res.json({
        predictions: mockPredictions,
        overall_map: 0.847,
        processing_time: 0.234,
        message: 'Space station equipment detection completed successfully'
      });

    } catch (error) {
      console.error('Prediction error:', error);
      
      // Clean up file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({ 
        error: 'Failed to process image',
        message: 'An error occurred while processing your image. Please try again.' 
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Orbital Vision Space Station Detection API is operational' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
