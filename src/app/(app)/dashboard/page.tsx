'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import EditProfileForm from '@/components/EditProfile'
import UserBlogs from '@/components/UserBlog'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Calendar, FileText } from 'lucide-react'

const ProfilePage = () => {
    const { profile } = useAuth()
    const [blogCount, setBlogCount] = useState<number>(0)

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

    if (!profile) return (
        <div className="flex justify-center items-center h-screen bg-black text-white">
            <p className="text-lg">Loading...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="relative h-64 bg-gradient-to-r from-zinc-800 to-zinc-900">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
                <Card className="bg-zinc-900 border-zinc-800 shadow-xl">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-3xl font-bold">Profile Details</CardTitle>
                            <EditProfileForm />
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
        </div>
    )
}

export default ProfilePage
