// src/app/api/displayBlog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    // Aggregation to fetch users and their total blog count
    const allUsersWithBlogCount = await User.aggregate([
      {
        $lookup: {
          from: "posts", // Collection name for Blog
          localField: "_id", // User ID in User collection
          foreignField: "userId", // User ID in Blog collection
          as: "posts", // Resultant field to hold related blogs
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          createdAt:1,
          firstName:1,
          lastName:1,
          totalBlogs: { $size: "$posts" }, // Calculate the total number of blogs
        },
      },
    ]);
    return NextResponse.json(allUsersWithBlogCount, { status: 200 });
  } catch (error) {
    console.error("Error fetching users with blog count:", error);
    return NextResponse.json(
      { message: "Failed to fetch users and blogs", error },
      { status: 500 }
    );
  }
}