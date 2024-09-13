import Blog from '@/models/Blog';
import connectDB from '@/lib/mongodb';

export default async function Blogs() {
    await connectDB();
    const blogs = await Blog.find({ published: true });
    return (
        <div>
            {blogs.map(blog => (
                <div key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.description}</p>
                    {/* Add more blog details */}
                </div>
            ))}
        </div>
    );
}
