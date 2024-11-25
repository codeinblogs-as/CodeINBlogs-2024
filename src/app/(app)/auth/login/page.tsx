"use client"
import Image from "next/image";
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
import { use, useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import User from '@/models/User'; // Ensure this import is correct
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { setCookie } from "cookies-next";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, logIn } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState([]);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const inputs = form.querySelectorAll('input');

    const handleInput = (e: Event) => {
      const inputEvent = e as InputEvent;
      const target = e.target as HTMLInputElement;

      if (inputEvent.inputType === undefined) {
        target.value = '';
        toast.error("Autofill detected. Please type your information directly to ensure accuracy.", {
          duration: 4000,
          position: "bottom-left",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
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

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        logIn(data, token);
        setCookie("userRole", data.role, { maxAge: 60 * 60 * 24 });
        localStorage.setItem('auth', JSON.stringify(data));

        toast.success(data.message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      toast.success("User login successfully");
      logIn(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      console.log("user", user);
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          axios.post("/api/googlelogin", { profile: res.data }).then((response) => {
            console.log('User register successfully', response.data);
            const token = response.data.token;
            logIn(response.data, token);
            localStorage.setItem('auth', JSON.stringify(response.data));
            toast.success("User login successfully");
            setTimeout(() => {
              router.push("/");
            }, 1000);
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <div className="bg-stone-950/50 rounded-md w-full md:w-[600px]">
        <div className="items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1">
          <div className="col-span-1 grid items-start gap-6 lg:col-span-1">
            <div>
              <TextureCardStyled>
                <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
                  <div className="p-1 bg-neutral-950 rounded-full mb-3">
                    <Image src={CodeINBlogsLogo} alt="CodeINBlogs Logo" className="h-16 w-16" width={200} height={200} />
                  </div>
                  <TextureCardTitle>Login To Continue</TextureCardTitle>
                  <p className="text-center">
                    Welcome back! Happy to have you here again.
                  </p>
                </TextureCardHeader>
                <TextureSeparator />
                <TextureCardContent>
                  <div className="flex justify-center gap-2 mb-4">
                    <TextureButton variant="icon" onClick={handleGoogleLogin}>
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

                  <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div>
                      <Label htmlFor="email">Username or Email</Label>
                      <Input
                        id="email-username"
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800/80 placeholder-neutral-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800/80 placeholder-neutral-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <TextureButton variant="accent" className="w-full" type="submit">
                      <div className="flex gap-1 items-center justify-center">
                        Log in
                        <ArrowRight className="h-4 w-4 text-neutral-50 mt-[1px]" />
                      </div>
                    </TextureButton>
                  </form>
                </TextureCardContent>
                <TextureSeparator />
                <TextureCardFooter className="rounded-b-sm">
                  <div className="bg-neutral-800 pt-px rounded-b-[20px] overflow-hidden w-full">
                    <div className="flex flex-col items-center justify-center">
                      <div className="py-2 px-2">
                        <Link href="./signup">
                          <div className="text-center text-sm">
                            Don't have an account?{" "}<span className="text-primary">Sign Up</span>
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
                </TextureCardFooter>
              </TextureCardStyled>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
