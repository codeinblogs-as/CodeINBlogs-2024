// src/app/api/createBlog/route.ts
import connectDB from '@/lib/mongodb'
import { IPost, Post } from '@/models/Blog'
import { NextRequest, NextResponse } from 'next/server'

// Named export for POST method
export async function POST(req: NextRequest) {
  const { title, subtitle, tags, coverImage, content, userId } = await req.json() as IPost

  console.log("req jso",tags);
  try {
    await connectDB()
    const newPost = new Post({
      title,
      subtitle,
      tags,
      coverImage,
      content,
      userId
    })
    await newPost.save()

    return NextResponse.json({ message: 'Post created successfully', post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating post', error }, { status: 500 })
  }
}
