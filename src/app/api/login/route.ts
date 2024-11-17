// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // If successful, you could set a session or token (optional)
    return NextResponse.json({ message: 'Login successful', user });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
  }
}
