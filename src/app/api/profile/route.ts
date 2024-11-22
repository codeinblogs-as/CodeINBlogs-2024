import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getSession } from 'next-auth/react';  // Use next-auth/react with NextAuth.js v4

export async function PUT(req: Request) {
  await connectDB();

  // Ensure user is authenticated

  const { username, email, profileImage, userId, firstName, lastName } = await req.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profileImage, firstName, lastName },
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ message: 'Update failed', error: errorMessage }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
