'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronDown, Layout, Mail, Plus, Trash, Upload, User, Users, FileText, Briefcase } from 'lucide-react'

export default function ModernAdminDashboard() {
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [showNewMailModal, setShowNewMailModal] = useState(false)
  const [showNewEventModal, setShowNewEventModal] = useState(false)
  const [showNewPartnerModal, setShowNewPartnerModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin ID: AD123456</span>
            <User className="h-8 w-8 text-gray-600 bg-gray-200 rounded-full p-1.5" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Total Users" value="10,234" icon={<Users className="h-6 w-6" />} />
          <MetricCard title="Total Visits" value="1,234,567" icon={<Layout className="h-6 w-6" />} />
          <MetricCard title="Active Blogs" value="456" icon={<FileText className="h-6 w-6" />} />
        </section>

        {/* Tabs for different sections */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="mails">Mails</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          {/* Users Table */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Users</h2>
              <Dialog open={showNewUserModal} onOpenChange={setShowNewUserModal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new user below.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access">Access</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit">Add User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Joined</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>No. of Blogs</TableHead>
                    <TableHead>Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-01-15</TableCell>
                    <TableCell>John</TableCell>
                    <TableCell>Doe</TableCell>
                    <TableCell>johndoe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>Member</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-02-20</TableCell>
                    <TableCell>Jane</TableCell>
                    <TableCell>Smith</TableCell>
                    <TableCell>janesmith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Admin Access Mails */}
          <TabsContent value="mails" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-gray-200">
                  <AdminMailItem
                    subject="New User Registration"
                    from="registration@example.com"
                  />
                  <AdminMailItem
                    subject="System Update Notification"
                    from="system@example.com"
                  />
                  <AdminMailItem
                    subject="Admin Panel Access Request"
                    from="support@example.com"
                  />
                  <AdminMailItem
                    subject="Weekly Analytics Report"
                    from="analytics@example.com"
                  />
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Events</h2>
              <Dialog open={showNewEventModal} onOpenChange={setShowNewEventModal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new event below.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventImage">Event Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input id="eventName" placeholder="Enter event name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDescription">Event Description</Label>
                      <Textarea id="eventDescription" placeholder="Enter event description" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDateTime">Date and Time</Label>
                      <Input id="eventDateTime" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bootcamp">Bootcamp</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit">Add Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard
                image="/placeholder.svg?height=100&width=100"
                name="Tech Conference 2024"
                description="Join us for the biggest tech conference of the year."
                dateTime="23rd March 2024 & 09:00 AM"
                type="Conference"
              />
              <EventCard
                image="/placeholder.svg?height=100&width=100"
                name="Web Dev Bootcamp"
                description="Intensive 4-week web development bootcamp for beginners."
                dateTime="1st April 2024 & 10:00 AM"
                type="Bootcamp"
              />
            </div>
          </TabsContent>

          {/* Review Blogs */}
          <TabsContent value="blogs" className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Review Blogs</h2>
            <div className="space-y-6">
              <BlogReviewCard
                title="10 Tips for Better Code"
                category="Programming"
                description="Discover 10 essential tips to improve your coding skills and write cleaner, more efficient code."
                author="Alice Johnson"
                avatar="/placeholder.svg?height=40&width=40"
                publishDate="2024-03-15"
              />
              <BlogReviewCard
                title="The Future of AI in Healthcare"
                category="Technology"
                description="Explore how artificial intelligence is revolutionizing the healthcare industry and improving patient outcomes."
                author="David Lee"
                avatar="/placeholder.svg?height=40&width=40"
                publishDate="2024-03-18"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Partners */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Community Partners</h2>
            <Dialog open={showNewPartnerModal} onOpenChange={setShowNewPartnerModal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Partner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Community Partner</DialogTitle>
                  <DialogDescription>
                    Upload the logo of the new community partner.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload partner logo</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Partner</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Image src="/placeholder.svg?height=100&width=200" alt="Partner 1" width={200} height={100} className="rounded-lg shadow-md" />
            <Image src="/placeholder.svg?height=100&width=200" alt="Partner 2" width={200} height={100} className="rounded-lg shadow-md" />
            <Image src="/placeholder.svg?height=100&width=200" alt="Partner 3" width={200} height={100} className="rounded-lg shadow-md" />
            <Image src="/placeholder.svg?height=100&width=200" alt="Partner 4" width={200} height={100} className="rounded-lg shadow-md" />
          </div>
        </section>
      </main>
    </div>
  )
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function EventCard({ image, name, description, dateTime, type }: { image: string; name: string; description: string; dateTime: string; type: string }) {
  return (
    <Card className="overflow-hidden">
      <Image src={image} alt={name} width={400} height={200} className="w-full h-48 object-cover" />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="mr-2 h-4 w-4" />
          {dateTime}
        </div>
        <Badge>{type}</Badge>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-4 py-3">
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="destructive" size="sm">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function BlogReviewCard({ title, category, description, author, avatar, publishDate }: { title: string; category: string; description: string; author: string; avatar: string; publishDate: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <Badge className="mt-2">{category}</Badge>
          </div>
          <div className="flex items-center">
            <Image src={avatar} alt={author} width={40} height={40} className="rounded-full mr-2" />
            <div>
              <p className="text-sm font-medium">{author}</p>
              <p className="text-xs text-gray-500">{publishDate}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="justify-end space-x-2 bg-gray-50 border-t">
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  )
}

function AdminMailItem({ subject, from }: { subject: string; from: string }) {
  return (
    <li className="p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{subject}</p>
          <p className="text-sm text-gray-500">{from}</p>
        </div>
        <Button variant="outline" size="sm">
          Remove Access
        </Button>
      </div>
    </li>
  )
}
