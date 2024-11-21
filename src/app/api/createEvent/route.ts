import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Await the parsed JSON body
    const body = await req.json();
    const { eventImage, eventName, eventDescription, eventDateTime, eventType } = body;

    // Validation
    if (!eventImage || !eventName || !eventDescription || !eventDateTime || !eventType) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Create and save the event
    const newEvent = new Event({
      eventImage,
      eventName,
      eventDescription,
      eventDateTime,
      eventType,
    });

    const savedEvent = await newEvent.save();

    // Respond with success
    return NextResponse.json({
      status: 200,
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create event", error: error.message },
      { status: 500 }
    );
  }
}
