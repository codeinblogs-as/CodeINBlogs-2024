import mongoose, { Schema, model, models } from "mongoose";

// Define the Event schema
const EventSchema = new Schema(
  {
    eventImage: { type: String, required: true },
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDateTime: { type: Date, required: true },
    eventType: { type: String, enum: ["bootcamp", "hackathon", "event", "webinar", "conference"], required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export the model
const Event = models.Event || model("Event", EventSchema);
export default Event;
