import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, author, content } = body;

    console.log("Bodu",body);
    if (!postId || !author || !content) {
      return NextResponse.json({ error: 'Post ID, author, and content are required' }, { status: 400 });
    }

    await connectDB(); // Ensure MongoDB is connected

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Add the comment to the comments array
    const comment = { author, content };
    post.comments.push(comment);
    await post.save();

    return NextResponse.json({ message: 'Comment added successfully', comments: post.comments }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /addComment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
