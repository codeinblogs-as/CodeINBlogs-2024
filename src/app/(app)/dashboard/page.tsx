'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import EditProfileForm from '@/components/EditProfile'
import UserBlogs from '@/components/UserBlog'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Calendar, FileText, LogOut, ArrowLeft } from 'lucide-react'
import CodeINBlogsBanner from "./CodeINBlogs.png"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const ProfilePage = () => {
    const { profile, logOut } = useAuth()
    const [blogCount, setBlogCount] = useState<number>(0)
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

    useEffect(() => {
        const fetchBlogCount = async () => {
            if (profile) {
                const response = await fetch(`/api/blogs/count?userId=${profile._id}`)
                const data = await response.json()
                setBlogCount(data.count || 0)
            }
        }
        fetchBlogCount()
    }, [profile])

    const handleLogout = () => {
        setIsLoggingOut(true)
        logOut()
        toast.success("Successfully logged out!")
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }

    if (!profile && !isLoggingOut) return (
        <div className="flex justify-center items-center h-screen bg-black text-white">
            <p className="text-lg">Loading...</p>
        </div>
    )

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
                {isLoggingOut ? (
                    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-black to-gray-900 text-white">
                        <div className="animate-pulse mb-4">
                        </div>
                        <p className="text-xl font-semibold">Logging out...</p>
                        <p className="text-sm text-gray-400">Please wait a moment.</p>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto px-4 mt-16 relative z-10">
                        <div className='p-1 border-2 border-b-0 border border-zinc-800 relative'>
                 
                            <Image src={CodeINBlogsBanner} alt="CodeINBlogs Banner" className='w-fit h-full' />
                        </div>
                        <Card className="bg-zinc-900 border-2 border-zinc-800 rounded-tr-none rounded-tl-none border-t-0 shadow-xl">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-3xl font-bold">Profile Details</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <EditProfileForm />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center text-red-500"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span className="ml-1">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <Avatar className="h-40 w-40 border-4 border-white ring-4 ring-zinc-800">
                                        <AvatarImage src={profile.profileImage || 'https://i.imgur.com/HT2ETSM.jpeg'} alt="Profile" />
                                        <AvatarFallback className="bg-zinc-800 text-white">{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col text-center md:text-left">
                                        <div className='mb-2'>
                                            <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                                            <h2 className="text-1xl font-semibold text-[#EEEADE]">@{profile.username}</h2>
                                        </div>
                                        <div className='gap-2'>
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
                            <h2 className="text-2xl font-semibold mb-6">My Blogs</h2>
                            <UserBlogs userId={profile._id.toString()} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePage
