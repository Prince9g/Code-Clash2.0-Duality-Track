import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Space Station Object Detection schemas
export const spaceStationObjectSchema = z.enum(['toolbox', 'oxygen_tank', 'fire_extinguisher']);

export const detectionSchema = z.object({
  class: spaceStationObjectSchema,
  confidence: z.number().min(0).max(1),
  bbox: z.array(z.number()).length(4).optional(),
  map_score: z.number().min(0).max(1).optional(), // mAP@0.5 score
});

export const predictionResponseSchema = z.object({
  predictions: z.array(detectionSchema),
  image_url: z.string().optional(),
  overall_map: z.number().min(0).max(1).optional(), // Overall mAP@0.5
  processing_time: z.number().optional(),
});

export type SpaceStationObject = z.infer<typeof spaceStationObjectSchema>;
export type Detection = z.infer<typeof detectionSchema>;
export type PredictionResponse = z.infer<typeof predictionResponseSchema>;
