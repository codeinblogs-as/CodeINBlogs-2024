import connectDB from "@/lib/mongodb";
import CommunityModel from "@/models/communityModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const communities = await CommunityModel.find({});
    return NextResponse.json({ status: 200, communities});
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Failed to fetch events", error });
  }
}
