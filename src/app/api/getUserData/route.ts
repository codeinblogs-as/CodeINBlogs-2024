// src/app/api/displayBlog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    await connectDB();
    try {
      // Extract query parameter from the request URL
      const { searchParams } = new URL(req.url);

      const username = searchParams.get('username'); // Extract the `slug` parameter
  
  
      if (!username) {
        return NextResponse.json({ message: 'No blog ID provided' }, { status: 400 });
      }
  
      // Find the blog post by ID
   
      const userData=await User.findOne({username});
    
      return NextResponse.json( userData, { status: 200 });
    } catch (error) {
      console.error("Error", error);
      return NextResponse.json({ message: 'Failed to fetch blog post', error }, { status: 500 });
    }
  }
  