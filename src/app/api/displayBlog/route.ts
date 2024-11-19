// src/app/api/displayBlog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    await connectDB();
    try {
      // Fetch posts and populate the `username` from the `User` model based on `userId`
      const posts = await Post.find().populate({
        path: 'userId',
        select: 'username', // Select only the `username` field
        model: User, // Reference the User model to fetch usernames
      });
      
  
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      console.log("Error ", error);
      return NextResponse.json({ message: 'Failed to fetch blog posts', error }, { status: 500 });
    }
  }
