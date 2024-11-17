import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import JWT from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();
  const secretKey = process.env.JWT_SECRET_KEY;
 
  if (!secretKey) {
 
    return NextResponse.json({ message: 'JWT Secret Key not found' }, { status: 500 });
  }
  

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

    // Generate token
    const token = JWT.sign({ _id: user._id }, secretKey, {
      expiresIn: '7d',
    });

    return NextResponse.json({ message: 'Login successful', user, token });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
  }
}
