'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from '@/context/AuthContext'

// Define types for comments
interface Comment {
  id: number;
  author: string;
  content: string;
  avatar: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  likes: number;
  comments: Comment[];
}

export default function BlogPage() {
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [blog, setBlog] = useState<Blog | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  const {profile}=useAuth();
  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/displaySpecificBlog?slug=${slug}`);
      const data = await response.json();
      setBlog(data);
      setComments(data.comments || []);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
    }
  };


  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && profile) {
    

      try {
        const postId=blog?._id;
        const response = await fetch(`/api/addComment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, author:profile?.username, content:newComment }),
        });

        if (response.ok) {
          // setComments([...comments, newCommentObj]);
          alert("Comment added")
          fetchBlog();
          setNewComment('');
        } else {
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch('/api/addLikesBlog', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: blog?._id }),
      });

      if (response.ok) {
        alert("Like added");
        fetchBlog();
        // const data = await response.json();
        // setBlog({ ...blog, likes: data.likes });
      } else {
        console.error('Failed to like the post');
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/allBlogs" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">{blog.title}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Author" />
              <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{blog.author}</span>
          </div>

          <Image src={blog.coverImage} alt="Blog cover" width={800} height={450} className="rounded-lg" />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose" />

          <div className="flex space-x-4">
            <Button variant="ghost" onClick={handleLike}>
              <Heart /> {blog.likes}
            </Button>
          </div>

          <div>
            <h3>Comments</h3>
            <ScrollArea>
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{comment.author}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          <form onSubmit={handleCommentSubmit}>
            <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." />
            <Button type="submit">Submit</Button>
          </form>
        </article>
      </main>
    </div>
  );
}
