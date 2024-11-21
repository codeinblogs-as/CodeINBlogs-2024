// src/app/api/displayBlog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    await connectDB();
    try {
      // Extract query parameter from the request URL
      const { searchParams } = new URL(req.url);

      const userId = searchParams.get('slug'); // Extract the `slug` parameter
    
  
      if (!userId) {
        return NextResponse.json({ message: 'No blog ID provided' }, { status: 400 });
      }
  
      // Find the blog post by ID
      const posts = await Post.find({ userId }).sort({ createdAt: -1 });
      if (!posts) {
        return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
      }
  
    
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      console.error("Error", error);
      return NextResponse.json({ message: 'Failed to fetch blog post', error }, { status: 500 });
    }
  }
  