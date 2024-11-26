'use client'

import { useState ,useRef,useEffect} from 'react'
import axios from 'axios'
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
import useAdminRedirect from '@/components/userValidation'

export default function ModernAdminDashboard() {
  useAdminRedirect();
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [showNewMailModal, setShowNewMailModal] = useState(false)
  const [showNewEventModal, setShowNewEventModal] = useState(false)
  const [showNewPartnerModal, setShowNewPartnerModal] = useState(false)
  const [events, setEvents] = useState<Event[]>([]);
  const [communities, setCommunites] = useState<Community[]>([]);
  const [formData, setFormData] = useState({
    eventImage: "",
    eventName: "",
    eventDescription: "",
    eventDateTime: "",
    eventType: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [partnerName, setPartnerName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // For preview
  const [loading, setLoading] = useState(true);
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, eventImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Fetch data from the Next.js API route
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllUser"); // Calling the API route
        setUsers(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchData();
  }, []);
  // Trigger hidden file input when clicking the visible upload button
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Event created successfully!");
        setFormData({
          eventImage: "",
          eventName: "",
          eventDescription: "",
          eventDateTime: "",
          eventType: "",
        });
      } else {
        setMessage(result.message || "Failed to create event.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/displayEvent");
        const data = await response.json();
        if (response.ok) {
          setEvents(data.events);
        } else {
          console.error(data.message || "Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await fetch("/api/displayCommunity");
        const data = await response.json();
        if (response.ok) {
          setCommunites(data.communities);
        } else {
          console.error(data.message || "Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result); // Base64 string
      reader.readAsDataURL(file);
    }
  };

  // Submit the form data
  const handleSubmitCommunity= async (e) => {
    e.preventDefault();

    if (!partnerName || !uploadedImage) {
      alert("Please provide both the partner name and image.");
      return;
    }

    try {
      const response = await axios.post("/api/addCommunityImage", {
        name: partnerName,
        base64Image: uploadedImage,
      });

      if (response.status === 200) {
        alert("Community Partner added successfully!");
        setShowNewPartnerModal(false);
        setPartnerName("");
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Error adding partner:", error);
      alert("Failed to add community partner.");
    }
  };
  if (loading) return <p>Loading...</p>;


  
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
          <MetricCard title="Total Users" value={users.length} icon={<Users className="h-6 w-6" />} />
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
                {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.totalBlogs}</TableCell>
                <TableCell>{user.accessLevel}</TableCell>
              </TableRow>
            ))}
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
                  <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Event Image */}
        <div className="space-y-2">
          <label htmlFor="eventImage" className="block font-medium">
            Event Image
          </label>
          <div
            onClick={triggerFileInput} // Trigger file input
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            id="eventImage"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Event Name */}
        <div className="space-y-2">
          <label htmlFor="eventName" className="block font-medium">
            Event Name
          </label>
          <input
            id="eventName"
            placeholder="Enter event name"
            className="w-full border rounded px-3 py-2"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Event Description */}
        <div className="space-y-2">
          <label htmlFor="eventDescription" className="block font-medium">
            Event Description
          </label>
          <textarea
            id="eventDescription"
            placeholder="Enter event description"
            className="w-full border rounded px-3 py-2"
            value={formData.eventDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Date and Time */}
        <div className="space-y-2">
          <label htmlFor="eventDateTime" className="block font-medium">
            Date and Time
          </label>
          <input
            id="eventDateTime"
            type="datetime-local"
            className="w-full border rounded px-3 py-2"
            value={formData.eventDateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <label htmlFor="eventType" className="block font-medium">
            Event Type
          </label>
          <select
            id="eventType"
            className="w-full border rounded px-3 py-2"
            value={formData.eventType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select event type</option>
            <option value="bootcamp">Bootcamp</option>
            <option value="hackathon">Hackathon</option>
            <option value="event">Event</option>
            <option value="webinar">Webinar</option>
            <option value="conference">Conference</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Create Event"}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
                 
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
        <EventCard
          key={event._id}
          image={event.eventImage}
          name={event.eventName}
          description={event.eventDescription}
          dateTime={new Date(event.eventDateTime).toLocaleString()}
          type={event.eventType}
        />
      ))}

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
            <form onSubmit={handleSubmitCommunity} className="space-y-4">
              <div>
                <label htmlFor="partnerName" className="block font-medium">
                  Community Partner Name
                </label>
                <input
                  type="text"
                  id="partnerName"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded text-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="commImage" className="block font-medium">
                  Community Partner Image
                </label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
                >
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Preview" className="mx-auto max-h-40" />
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="commImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add Partner</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Display existing community partners */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {communities.map((community, index) => (
    <div key={index} className="rounded-lg shadow-md">
      <Image 
        src={community.
          communityImage
          } 
        alt={community.name} 
        width={200} 
        height={100} 
        className="rounded-lg shadow-md" 
      />
      <p className="mt-2 text-center text-gray-700">{community.name}</p>
    </div>
  ))}
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
