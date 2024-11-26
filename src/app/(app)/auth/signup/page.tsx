"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "../component/input";
import { Label } from "../component/label";
import { TextureButton } from "../component/texture-btn";
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "../component/texture-card";
import CodeINBlogsLogo from "../component/logo/CodeINBlogs.png";
import Link from "next/link";
import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import User from '@/models/User'; // Ensure this import is correct
import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useGoogleLogin } from '@react-oauth/google';
interface SignupData {
  first: string;
  last: string;
  username: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter(); // Initialize router
  const [user, setUser] = useState([]);
  
  const handleGoogleRegister = useGoogleLogin({
    onSuccess: (codeResponse) => {
        setUser(codeResponse);
       
    },
    onError: (error) => console.log('Login Failed:', error)
});

useEffect(() => {
  if (user) {
    console.log("Dfd",user)
      const res = axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json',
              },
          })
          .then((res) => {
              axios.post('/api/googleRegister', { profile: res.data }).then((response) => {
                alert("Register successfully");
                router.push('/')
                  window.location.reload();
              });
          })
          .catch((err) => console.log(err));
  }
}, [user]);
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const inputs = form.querySelectorAll('input');

    const handleInput = (e: Event) => {
      const inputEvent = e as InputEvent;
      const target = e.target as HTMLInputElement;

      if (inputEvent.inputType === undefined) {
        target.value = '';
        toast.error('Autofill detected. Please type your information directly to ensure accuracy.', {
          duration: 4000,
          position: 'bottom-left',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    };

    inputs.forEach((input: Element) => {
      input.addEventListener('input', handleInput);
    });

    return () => {
      inputs.forEach((input: Element) => {
        input.removeEventListener('input', handleInput);
      });
    };
  }, []);

  const handleSignup = async (data: SignupData) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully!');
        router.push('/'); // Redirect to homepage on successful signup
      } else {
        toast.error(result.message || 'Failed to create account.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const data: SignupData = {
      first: form.first.value,
      last: form.last.value,
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    handleSignup(data);
  };

  return (
    <div className="flex items-center justify-center py-4">
      <Toaster />
      <div className="bg-stone-950/50 h-full rounded-md">
        <div className="items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1">
          <div className="col-span-1 grid items-start gap-6 lg:col-span-1">
            <div>
              <TextureCardStyled>
                <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
                  <div className="p-1 bg-neutral-950 rounded-full mb-3">
                    <Image src={CodeINBlogsLogo} alt="CodeINBlogs Logo" className="h-16 w-16" width={200} height={200} />
                  </div>
                  <TextureCardTitle>Create your account</TextureCardTitle>
                  <p className="text-center">
                    Welcome! Please fill in the details to get started.
                  </p>
                </TextureCardHeader>
                <TextureSeparator />
                <TextureCardContent>
                  <div className="flex justify-center gap-2 mb-4">
                    <TextureButton variant="icon" onClick={handleGoogleRegister}>
                      <svg
                        width="256"
                        height="262"
                        viewBox="0 0 256 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        className="h-5 w-5"
                      >
                        <path
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          fill="#4285F4"
                        />
                        <path
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          fill="#34A853"
                        />
                        <path
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          fill="#FBBC05"
                        />
                        <path
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          fill="#EB4335"
                        />
                      </svg>
                      <strong className="pl-2 text-zinc-300">Google</strong>
                    </TextureButton>
                  </div>
                  <div className="text-center text-sm mb-4">or</div>

                  <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                    <div className="flex justify-between gap-2">
                      <div>
                        <Label htmlFor="first">First name</Label>
                        <Input
                          id="first"
                          type="text"
                          required
                          className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800/80 placeholder-neutral-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last">Last Name</Label>
                        <Input
                          id="last"
                          type="text"
                          required
                          className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800/80 placeholder-neutral-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-md border border-neutral-700  bg-neutral-800/80 placeholder-neutral-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800/80 placeholder-neutral-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800/80 placeholder-neutral-500"
                      />
                    </div>
                    <TextureCardFooter className=" rounded-b-sm">
                      <TextureButton variant="accent" className="w-full" type="submit">
                        <div className="flex gap-1 items-center justify-center">
                          Continue
                          <ArrowRight className="h-4 w-4 text-neutral-50 mt-[1px]" />
                        </div>
                      </TextureButton>
                    </TextureCardFooter>
                  </form>
                </TextureCardContent>
                <TextureSeparator />

                <div className="bg-neutral-800 pt-px rounded-b-[20px] overflow-hidden">
                  <div className="flex flex-col items-center justify-center">
                    <div className="py-2 px-2">
                      <Link href="./login"> <div className="text-center text-sm">
                        Already have an account?{" "}
                        <span className="text-primary">Sign in</span>
                      </div>
                      </Link>
                    </div>
                  </div>
                  <TextureSeparator />
                  <div className="flex flex-col items-center justify-center">
                    <div className="py-2 px-2">
                      <div className="text-center text-xs">
                        Secured by <b>Our Servers</b>
                      </div>
                    </div>
                  </div>
                </div>
              </TextureCardStyled>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
