import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "@/models/User"; // Replace with the path to your user model
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    // Save OTP and expiry to the user's record
    user.resetPasswordOtp = otpHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Set this in environment variables
        pass: process.env.EMAIL_PASSWORD, // Set this in environment variables
      },
    });

    await transporter.sendMail({
      from: '"Your App Name" <no-reply@yourapp.com>',
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. It is valid for 15 minutes.`,
    });

    return new Response(
      JSON.stringify({ message: "OTP sent to your email" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await connectDB();

  try {
    const { email, otp, newPassword } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Check OTP and expiry
    if (!user.resetPasswordOtp || Date.now() > user.resetPasswordExpires) {
      return new Response(
        JSON.stringify({ message: "OTP expired or invalid" }),
        { status: 400 }
      );
    }

    const isOtpValid = await bcrypt.compare(otp, user.resetPasswordOtp);

    if (!isOtpValid) {
      return new Response(
        JSON.stringify({ message: "Invalid OTP" }),
        { status: 400 }
      );
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP fields
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
}
