import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getSession } from 'next-auth/react';  // Use next-auth/react with NextAuth.js v4

export async function PUT(req: Request) {
  await connectDB();

  // Ensure user is authenticated
 

  const { username, email, profileImage,userId } = await req.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profileImage },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Update failed', error: error.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
