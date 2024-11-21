import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({});
    return NextResponse.json({ status: 200, events });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Failed to fetch events", error });
  }
}
