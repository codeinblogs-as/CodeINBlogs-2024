import { NextResponse } from 'next/server';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const { profile } = await req.json();
        console.log("profile ",profile);
        if (!profile) {
            return NextResponse.json({ error: 'Profile data is required.' }, { status: 400 });
        }
        const email=profile.email;
        const existingUser = await User.findOne({  email});

        if (existingUser) {
          return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
        }
        
        const user=User({username:profile.name,email:profile.email});
      user.save();
       
return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
    
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to find user.' }, { status: 500 });
    }
}
