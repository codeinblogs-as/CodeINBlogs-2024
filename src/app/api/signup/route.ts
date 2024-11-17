import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectDB(); // Connect to MongoDB

  const { first, last, username, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    const user = new User({
      firstName:first,
      lastName:last,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json({ message: 'An error occurred during signup.' }, { status: 500 });
  }
}
