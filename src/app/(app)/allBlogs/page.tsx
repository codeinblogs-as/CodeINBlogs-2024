'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
interface Blog {
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    date: string;
    readTime: string;
    authorImg: string;
  };
  image: string;
  slug: string
}

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {}

// Utility function to get a random Tailwind color class
const getRandomColor = () => {
  const colors = [
    'bg-green-700/50',
    'bg-blue-700/50',
    'bg-yellow-700/50',
    'bg-purple-700/50',
    'bg-pink-700/50',
    'bg-indigo-700/50', 
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/displayBlog');
        const data = await response.json();

        const formattedData = data.map((post: any) => ({
          title: post.title,
          content: post.content,
          category: post.tags[0] || 'Uncategorized',
          author: {
            name: post.userId?.username || 'Unknown',
            date: new Date(post.createdAt).toLocaleDateString(),
            readTime: '5 min read',
            authorImg: "", // Replace with actual image if available
          },
          image: post.coverImage || '/default-cover.jpg',
          slug: post.slug || post._id, // Use slug or id for unique route
        }));
        console.log("formated data",formattedData);

        setBlogs(formattedData);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  const redirectToSepcific = async (blogname:string,blogslug: string) => {
    console.log("Ad");
    router.push(`/allBlogs/${blogname}/${blogslug}`);
  };

  return (
    <section
      id="Blogs"
      aria-label="Tech Blogs Written By Our Community Developers To Help Developers!"
      className="relative py-20 sm:py-10 z-1 bg-[#0c0b12]/80 bg-page-gradient"
    >
      <div className="absolute -z-1 inset-0 h-[600px] w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-0 z-[0] h-screen opacity-20 w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-x-0 -top-10 opacity-50 z-10 m-auto h-[27rem] max-w-lg sm:h-64 sm:max-w-7xl"></div>
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="text-2xl md:text-4xl text-center mb-2 font-semibold tracking-tighter ">
            <span className="bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent">Tech Blogs</span>
          </h2>
          <p className="text-base md:text-lg text-center text-slate-100 mb-4">
            Tech Blogs Written By Our Community Developers To Help Developers!
          </p>
        </div>
        <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 mt-8 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <li key={index}>
                 
              <figure className="relative rounded-2xl bg-black/60 transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] p-6 shadow-xl"   onClick={() => redirectToSepcific(blog.author.name,blog.slug)}>
                <div className="relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={700}
                    height={475}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full" />
                </div>
                <figcaption className="mt-4">
                  <span className={`text-white text-xs font-bold uppercase px-2 py-1 rounded-sm ${getRandomColor()}`}>{blog.category}</span>
                  <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
                  <div className="mt-2 text-gray-400" dangerouslySetInnerHTML={{ __html: blog.content }} />
                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={blog.author.authorImg}
                        alt={blog.author.name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-700 ring-2 ring-gray-500"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-300">{blog.author.name}</p>
                      <div className="text-sm text-gray-500">
                        <time dateTime={blog.author.date}>{blog.author.date}</time> · {blog.author.readTime}
                      </div>
                    </div>
                  </div>
                </figcaption>
              </figure>
             
            </li>
          ))}
        </ul>
        
        
      </Container>
    </section>
  );
}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}
