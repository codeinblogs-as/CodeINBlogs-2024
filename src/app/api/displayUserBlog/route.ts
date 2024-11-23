// src/app/api/displayBlog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    await connectDB();
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('slug');

      if (!userId) {
        return NextResponse.json({ message: 'No blog ID provided' }, { status: 400 });
      }

      const posts = await Post.find({ userId })
        .sort({ createdAt: -1 })
        .populate({
          path: 'userId',
          select: 'username firstName lastName profileImage',
          model: User
        });

      if (!posts) {
        return NextResponse.json({ message: 'Blog posts not found' }, { status: 404 });
      }

      // Return the raw posts with populated userId
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      console.error("Error", error);
      return NextResponse.json({ message: 'Failed to fetch blog posts', error }, { status: 500 });
    }
}
