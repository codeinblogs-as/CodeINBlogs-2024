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

      const id = searchParams.get('slug'); // Extract the `slug` parameter
    
  
      if (!id) {
        return NextResponse.json({ message: 'No blog ID provided' }, { status: 400 });
      }
  
      // Find the blog post by ID
      const post = await Post.findById(id);
   
      if (!post) {
        return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
      }
  
      // Find the author using the userId from the post
      const author = await User.findById(post.userId).select('username');
     
      if (!author) {
        return NextResponse.json({ message: 'Author not found' }, { status: 404 });
      }
  
      // Return the post along with the author's username
      const result = {
        ...post.toObject(),
        author: author.username, // Add the author's username to the response
      };
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error", error);
      return NextResponse.json({ message: 'Failed to fetch blog post', error }, { status: 500 });
    }
  }
  