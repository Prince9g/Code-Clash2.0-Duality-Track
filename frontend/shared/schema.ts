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

// Object Detection schemas
export const detectionSchema = z.object({
  class: z.string(),
  confidence: z.number(),
  bbox: z.array(z.number()).length(4).optional(),
});

export const predictionResponseSchema = z.object({
  predictions: z.array(detectionSchema),
  image_url: z.string().optional(),
});

export type Detection = z.infer<typeof detectionSchema>;
export type PredictionResponse = z.infer<typeof predictionResponseSchema>;
