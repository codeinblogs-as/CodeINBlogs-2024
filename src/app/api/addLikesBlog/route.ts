import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    await connectDB(); // Ensure MongoDB is connected
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ likes: post.likes }, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH /addLikesBlog:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
