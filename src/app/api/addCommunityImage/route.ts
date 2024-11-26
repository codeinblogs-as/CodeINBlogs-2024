import connectDB from "@/lib/mongodb";
import CommunityModel from "@/models/communityModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    try {
        const { name, base64Image } =await req.json(); // Destructure the incoming data
        connectDB();

        const communitydata=await new CommunityModel({
            name: name,
            communityImage: base64Image
        });
        communitydata.save();

      
        return NextResponse.json({
            status: 200,
            message: "Community Added successfully",
            communitydata,
          });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to create event", error: error.message },
            { status: 500 }
          );
    }
  
}
