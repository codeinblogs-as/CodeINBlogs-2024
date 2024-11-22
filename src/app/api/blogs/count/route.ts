import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Post } from '@/models/Blog';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const count = await Post.countDocuments({ userId });
    return NextResponse.json({ count });

  } catch (error) {
    console.error('Error counting blogs:', error);
    return NextResponse.json(
      { message: 'Failed to count blogs', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
