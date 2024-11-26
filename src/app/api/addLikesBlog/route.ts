import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, userId } = body;

    if (!postId || !userId) {
      return NextResponse.json({ error: 'Post ID and User ID are required' }, { status: 400 });
    }

    await connectDB();

    // Find the post and check if the user has already liked it
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log("psot",post);
    if (post.likedBy.includes(userId)) {
      return NextResponse.json({ error: 'User has already liked this post' }, { status: 403 });
    }

    // Add the user ID to likedBy and increment the likes count
    post.likedBy.push(userId);
    post.likes += 1;
    await post.save();

    return NextResponse.json({ likes: post.likes }, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH /addLikesBlog:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
