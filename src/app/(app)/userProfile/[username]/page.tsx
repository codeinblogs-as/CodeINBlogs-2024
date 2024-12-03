'use client';

import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Calendar, FileText, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserBlogs from '@/components/UserBlog';
import CodeINBlogsBanner from './CodeINBlogs.png';
import { usePathname } from 'next/navigation';


const ReadOnlyProfile = () => {
   
    const pathname = usePathname();
    const username = pathname.split('/').pop();
    const [profile, setProfile] = useState(null);
    const [blogCount, setBlogCount] = useState<number>(0);

    useEffect(() => {
        const fetchProfile = async () => {
            if (username) {
                try {
                    const response = await fetch(`/api/getUserData?username=${username}`);
                    const data = await response.json();
                    setProfile(data);
console.log("data",data._id);
                    if(profile){

                 console.log("profile")
                    const blogResponse = await fetch(`/api/blogs/count?userId=${profile._id}`);
                    const blogData = await blogResponse.json();
                    setBlogCount(blogData.count || 0);
                }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };
        fetchProfile();
    }, [username]);

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-white">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Link
                href="/"
                className="fixed top-6 left-6 flex items-center gap-2 text-white hover:text-purple-300 bg-[#141421] px-4 py-2 rounded-md transition-colors duration-200 border border-gray-800 z-50 backdrop-blur-md bg-opacity-80"
            >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
            </Link>
            <div className="min-h-screen bg-black text-white">
                <div className="max-w-6xl mx-auto px-4 mt-16 relative z-10">
                    <div className="p-1 border-2 border-b-0 border-zinc-800 relative">
                        <Image src={CodeINBlogsBanner} alt="CodeINBlogs Banner" className="w-fit h-full" />
                    </div>
                    <Card className="bg-zinc-900 border-2 border-zinc-800 rounded-tr-none rounded-tl-none border-t-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Profile Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <Avatar className="h-40 w-40 border-4 border-white ring-4 ring-zinc-800">
                                    <AvatarImage src={profile.profileImage || 'https://i.imgur.com/HT2ETSM.jpeg'} alt="Profile" />
                                    <AvatarFallback className="bg-zinc-800 text-white">{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col text-center md:text-left">
                                    <div className="mb-2">
                                        <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                                        <h2 className="text-1xl font-semibold text-[#EEEADE]">@{profile.username}</h2>
                                    </div>
                                    <div className="gap-2">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400">
                                            <Mail className="h-4 w-4" />
                                            <span>{profile.email}</span>
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400">
                                            <Calendar className="h-4 w-4" />
                                            <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400">
                                            <FileText className="h-4 w-4" />
                                            <span>Total Blogs Written: {blogCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className="my-8 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-20" />

                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Blogs by {profile.firstName}</h2>
                        <UserBlogs userId={profile._id} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReadOnlyProfile;
