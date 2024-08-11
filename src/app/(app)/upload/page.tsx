"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { format } from "date-fns";
import { FileUpload } from "@/components/global/fileUpload";

export default function UploadBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Author");
  const [isClient, setIsClient] = useState(false);
  const [publishedDate] = useState(format(new Date(), "MMMM dd, yyyy"));
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    const file = uploadedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#12111d] text-white">
      <Head>
        <title>Upload Blog</title>
      </Head>
      <div className="container mx-auto flex flex-col md:flex-row py-8 px-4">
        {/* Left Section: Form */}
        <div className="md:w-1/2 p-6 space-y-6">
          <h1 className="text-4xl font-bold mb-4">Upload Your Blog</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Blog Title</label>
              <input
                type="text"
                className="w-full p-4 bg-[#1e1e2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Description</label>
              <textarea
                className="w-full p-4 bg-[#1e1e2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your blog content here"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Category</label>
              <input
                type="text"
                className="w-full p-4 bg-[#1e1e2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Social Media Link</label>
              <input
                type="text"
                className="w-full p-4 bg-[#1e1e2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                placeholder="Your social media handle"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Blog Image</label>
              <div className="w-full max-w-4xl mx-auto">
                <FileUpload onChange={handleFileUpload} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full p-4 bg-[#1e1e2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-all">
            Publish Blog
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Your blog will be live upon admin approval. This may take up to 24 hours.
          </p>
        </div>

        {/* Right Section: Preview */}
        <div className="md:w-1/2 mt-8 md:mt-0 p-6 border border-gray-700 rounded-lg bg-[#1c1c24]">
          <h2 className="text-3xl font-semibold mb-4">Blog Preview</h2>
          <div className="p-6 bg-[#2a2a2f] border border-gray-600 rounded-lg">
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
            <h3 className="text-xl font-bold">{title || "Your Blog Title"}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {publishedDate} by {email || "Your Name"} - {role}
            </p>
            <p className="mt-4 text-sm text-gray-300">{category || "Category"}</p>
            <p className="mt-2 text-gray-200">{description || "Your blog content will appear here..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
