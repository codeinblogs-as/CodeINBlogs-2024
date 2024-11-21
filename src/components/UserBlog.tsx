'use client';

import React, { useEffect, useState } from 'react';

const UserBlogs = ({ userId }: { userId: string }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading blogs...</p>;

  if (blogs.length === 0) return <p>No blogs found for this user.</p>;

  return (
    <div>
      <h2>User Blogs</h2>
      <ul>
        {blogs.map((blog: any) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            {blog.coverImage && <img src={blog.coverImage} alt={blog.title} />}
            <p>{blog.subtitle}</p>
            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
