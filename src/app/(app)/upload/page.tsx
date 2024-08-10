"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { format } from "date-fns";

export default function UploadBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Author"); // Define the role state here
  const [isClient, setIsClient] = useState(false);
  const [publishedDate] = useState(format(new Date(), "MMMM dd, yyyy"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#12111d] text-white">
      <Head>
        <title>Upload Blog</title>
      </Head>
      <div className="container mx-auto flex flex-col md:flex-row py-8 px-4">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Upload a Blog</h1>
          <p className="text-sm text-gray-400 mb-8">
            Share Your Knowledge, Inspire Others
          </p>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Blog Title</label>
            <input
              type="text"
              className="w-full p-3 bg-[#1e1c2a] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483D8B]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Blog Title Here"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Description</label>
            <textarea
              className="w-full p-3 bg-[#1e1c2a] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483D8B]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your blog content here"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Blog Category</label>
            <input
              type="text"
              className="w-full p-3 bg-[#1e1c2a] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483D8B]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Topic"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Your Social Media Handle</label>
            <input
              type="text"
              className="w-full p-3 bg-[#1e1c2a] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483D8B]"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              placeholder="Social Media Link"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 bg-[#1e1c2a] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483D8B]"
              onChange={handleImageUpload}
            />
            <p className="mt-1 text-xs text-gray-400">Please upload a square image, size less than 2MB</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-[#1e1c2a] text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483D8B]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <button className="w-full bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-500 transition-all">
            Post Blog
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Your Blog will be live upon approval by the admin. Approval may take up to 24 hours.
          </p>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Blog Preview</h2>
          <div className="p-4 bg-[#1e1c2a] rounded-lg">
            {image && (
              <div className="mb-4">
                <Image
                  src={image}
                  alt="Blog Image"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-100">
              {title || "Blog Title Here"}
            </h3>
            <p className="text-sm text-gray-400">
              {publishedDate} by <span className="font-semibold text-gray-300">{email || "Your Name"}</span> - {role}
            </p>
            <p className="mt-4 text-sm text-gray-400">{category || "Category"}</p>
            <div className="mt-4">
              {description ? (
                <p className="text-gray-200">{description}</p>
              ) : (
                <p className="italic text-gray-500">Your blog content will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
