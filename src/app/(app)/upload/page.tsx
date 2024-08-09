"use client";

import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { format } from "date-fns";

export default function UploadBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [role] = useState("Developer");
  const [email, setEmail] = useState("");
  const [publishedDate] = useState(format(new Date(), "MMMM dd, yyyy"));

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Upload Blog</title>
      </Head>
      <div className="container mx-auto flex flex-col md:flex-row py-8">
        <div className="md:w-1/2 px-4">
          <h1 className="text-3xl font-bold mb-6">Upload a Blog</h1>
          <div className="mb-4">
            <label className="block mb-1">Blog Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Blog Title Here"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              className="w-full p-2 bg-gray-800 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your blog content here"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Blog Category</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Topic"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Your Social Media Handle</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 rounded"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              placeholder="Social Media Link"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 bg-gray-800 rounded"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-800 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <button className="bg-blue-600 px-4 py-2 rounded text-white">
            Post Blog
          </button>
          <p className="mt-2 text-xs">
            Your blog will be live upon approval by the admin. Approval may take up to 24 hours.
          </p>
        </div>

        <div className="md:w-1/2 px-4 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Blog Preview</h2>
          <div className="p-4 bg-gray-800 rounded">
            {image && (
              <div className="mb-4">
                <Image
                  src={image}
                  alt="Blog Image"
                  width={400}
                  height={200}
                  className="rounded"
                />
              </div>
            )}
            <h3 className="text-xl font-bold">{title || "Blog Title Here"}</h3>
            <p className="text-sm text-gray-400">
              {publishedDate} by <span className="font-semibold">{email || "Your Name"}</span> - {role}
            </p>
            <p className="mt-4 text-sm text-gray-400">{category || "Category"}</p>
            <div className="mt-4">
              {description ? (
                <p>{description}</p>
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
