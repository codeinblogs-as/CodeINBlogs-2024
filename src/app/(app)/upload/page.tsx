"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import { X, Bold, Italic, List, ListOrdered, Quote, Code, ImageIcon, Link2, Eye, Send, ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from '@/context/AuthContext';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }
    const {profile}=useAuth();


  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-muted' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-muted' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-muted' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          const url = window.prompt('Enter the image URL')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          const url = window.prompt('Enter the link URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className={editor.isActive('link') ? 'bg-muted' : ''}
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function BlogEditorWithPreview() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const {profile}=useAuth();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your blog post here...',
      }),
      Link,
      TiptapImage,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none ${
              theme === 'dark' ? 'prose-invert' : ''
            }`,
          },
        },
      })
    }
  }, [editor, theme])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setCoverImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePublish = useCallback(async () => {
    if (editor) {
      const content = editor.getHTML()
      const userId=profile?._id;
      const postData = { title, subtitle, tags, coverImage, content,userId }

      console.log("psot dat",postData);
      try {
        const response = await axios.post('/api/createBlog', postData)
        console.log('Publishing response:', response.data)
      } catch (error) {
        console.error('Error publishing:', error)
      }
    }
  }, [editor, title, subtitle, tags, coverImage])
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const BlogPreview = () => (
    <div className={`min-h-screen bg-white text-black ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to editor
          </button>
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
            <h1 className="text-4xl font-bold tracking-tight">{title || 'Your Blog Title'}</h1>
            {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                  <AvatarFallback>{profile?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{profile?.username}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span>8 min read</span>
              <Separator orientation="vertical" className="h-4" />
              <span>May 15, 2024</span>
            </div>
          </div>

          {coverImage && (
            <Image
              src={coverImage}
              alt="Blog post cover image"
              width={800}
              height={450}
              className="rounded-md object-cover w-full"
            />
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} />
        </article>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>0 Likes</p>
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
                    <p>0 Comments</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-5 w-5" />
                      <span className="sr-only">Bookmark</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bookmark</p>
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
        </div>
      </main>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold border-none p-0 focus-visible:ring-0"
        />
        <Input
          type="text"
          placeholder="Add a subtitle (optional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="text-xl text-muted-foreground border-none p-0 focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm">
            {tag}
            <Button variant="ghost" size="sm" onClick={() => handleRemoveTag(tag)} className="ml-2 h-4 w-4 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Input
          type="text"
          placeholder="Add a tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-24 h-8 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover-image">Cover Image</Label>
        <div className="border-2 border-dashed rounded-md p-4 text-center">
          {coverImage ? (
            <div className="relative">
              <Image src={coverImage} alt="Cover image" width={800} height={400} className="mx-auto rounded-md" />
              <Button variant="destructive" size="sm" onClick={() => setCoverImage(null)} className="absolute top-2 right-2">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">Click to upload a cover image</p>
            </>
          )}
          <input
            id="cover-image"
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
            Select Image
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <MenuBar editor={editor} />
        <div className="border rounded-md p-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
            <AvatarFallback>{profile?.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{profile?.username}</p>

          </div>
        </div>
        <div className="space-x-2">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Blog Post Preview</DialogTitle>
                <DialogDescription>This is how your blog post will look when published.</DialogDescription>
              </DialogHeader>
              <BlogPreview />
            </DialogContent>
          </Dialog>
          <Button onClick={handlePublish}>
            <Send className="mr-2 h-4 w-4" /> Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
