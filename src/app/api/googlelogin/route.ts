import { NextResponse } from 'next/server';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const { profile } = await req.json();
        if (!profile) {
            return NextResponse.json({ error: 'Profile data is required.' }, { status: 400 });
        }

        const user = await User.findOne({ email: profile.email });
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json({ error: 'JWT Secret Key not found.' }, { status: 500 });
        }

        if (user) {
            console.log('User login successfully');
            const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
            return NextResponse.json({ success: true, user, token });
        } else {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to find user.' }, { status: 500 });
    }
}
