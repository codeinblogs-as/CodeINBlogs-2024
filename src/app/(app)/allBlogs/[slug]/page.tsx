'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define types for comments
interface Comment {
  id: number;
  author: string;
  content: string;
  avatar: string;
}

interface Blog {
    title: string;
    content: string;
    category: string;
    author: string
    image: string;
    
  }
  

export default function BlogPage() {
  const [likes, setLikes] = useState<number>(42)
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Alice', content: 'Great article! Very informative.', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, author: 'Bob', content: 'I learned a lot from this. Thanks for sharing!', avatar: '/placeholder.svg?height=40&width=40' }
  ])
  const [newComment, setNewComment] = useState<string>('')
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj: Comment = { 
        id: comments.length + 1, 
        author: 'You', 
        content: newComment, 
        avatar: '/placeholder.svg?height=40&width=40' 
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const toggleDetail = () => {
    setIsDetailOpen(!isDetailOpen)
  }

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
            console.log("Slug ",slug);
            const response = await fetch(`/api/displaySpecificBlog?slug=${slug}`);

          const data = await response.json();
          setBlog(data);
        } catch (error) {
          console.error('Failed to fetch blog post', error);
        }
      };

      fetchBlog();
    }
  }, [slug]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/allBlogs" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-8">
        <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{blog.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>{blog.author}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span>8 min read</span>
              <Separator orientation="vertical" className="h-4" />
              <span>May 15, 2024</span>
            </div>
          </div>

          <Image
            src={blog.coverImage  }
            alt="Blog post cover image"
            width={800}
            height={450}
            className="rounded-lg object-cover w-full"
          />
   <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content }} />
       
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleLike}>
                        <Heart className={`h-5 w-5 ${likes > 42 ? 'fill-primary text-primary' : ''}`} />
                        <span className="sr-only">Like</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{likes} Likes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-5 w-5" />
                        <span className="sr-only">Comment</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{comments.length} Comments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={toggleBookmark}>
                        <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
                        <span className="sr-only">Bookmark</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Share on Twitter</DropdownMenuItem>
                    <DropdownMenuItem>Share on Facebook</DropdownMenuItem>
                    <DropdownMenuItem>Copy link</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{comment.author}</p>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button type="submit">Post Comment</Button>
            </form>
          </div>
        </article>
      </main>
    </div>
  )
}