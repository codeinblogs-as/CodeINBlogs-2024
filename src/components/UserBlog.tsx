'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const UserBlogs = ({ userId }: { userId: string }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/displayUserBlog?slug=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userId]);

  const handleBlogClick = (blogId: string) => {
    router.push(`/allBlogs/${blogId}`);
  };

  if (loading) return <p className="text-white">Loading blogs...</p>;

  if (blogs.length === 0) return <p className="text-white">No blogs found for this user.</p>;

  return (
    <div className="mx-auto my-8 px-4 lg:px-0">
      <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-3">
        {blogs.slice(0, 3).map((blog: any, index: number) => (
          <li key={index} onClick={() => handleBlogClick(blog._id)} className="cursor-pointer">
            <figure className="relative rounded-2xl bg-black/60 transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] p-6 shadow-xl hover:scale-105 transition-transform duration-200">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                <Image
                  src={blog.coverImage || '/default-cover.jpg'}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full" />
              </div>
              <figcaption className="mt-4">
                <span
                  className={`text-white text-xs font-bold uppercase px-2 py-1 rounded-sm ${getRandomColor()}`}
                >
                  {blog.tags?.[0] || 'Uncategorized'}
                </span>
                <h2 className="text-2xl font-bold mt-2 text-white">{blog.title}</h2>
                <div
                  className="mt-2 text-gray-400 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="flex items-center mt-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={blog.userId?.profileImage || 'https://i.imgur.com/HT2ETSM.jpeg'}
                      alt={`${blog.userId?.firstName || 'Unknown'} ${blog.userId?.lastName || 'Author'}`}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-gray-700 ring-2 ring-gray-500"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-300">
                      {`${blog.userId?.firstName || ''} ${blog.userId?.lastName || 'Unknown Author'}`}
                    </p>
                    <div className="text-sm text-gray-500">
                      <time dateTime={new Date(blog.createdAt).toISOString()}>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </time>
                      {' · 5 min read'}
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
