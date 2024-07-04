import clsx from 'clsx';
import Image from 'next/image';

const Blogs = [
  {
    title: 'Top 5 Software Development ',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium maiores libero quam dicta dolor dolorum. Enim, odio dolores! Dolorum, ipsum!',
    author: {
      name: 'Roberta Casas',
      category: 'Software Dev',
      date: 'Aug 15, 2024',
      readTime: '16 min read',
      authorImg:'',
    },
    image: "data:image/jpeg;base64,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",
  },
  {
    title: 'Top 5 best website develpment courses',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium maiores libero quam dicta dolor dolorum. Enim, odio dolores! Dolorum, ipsum!',
    author: {
      name: 'Roberta Casas',
      category: 'Web Dev',
      date: 'Aug 15, 2024',
      readTime: '16 min read',
      authorImg:'',
    },
    image: "https://tailwindcss.com/_next/static/media/4.a2ed7a78.jpg",
  },
  {
    title: 'Top 5 best app development courses',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium maiores libero quam dicta dolor dolorum. Enim, odio dolores! Dolorum, ipsum!',
    author: {
      name: 'Roberta Casas',
      category: 'APP Dev',
      date: 'Aug 15, 2024',
      readTime: '16 min read',
      authorImg:'',
    },
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxJln0LCYC7wuMR47NBxm1MyAbeE1y0QD2tg&s",
  },
];

interface Blog {
  title: string;
  content: string;
  author: {
    name: string;
    category: string;
    date: string;
    readTime: string;
    authorImg:string;
  };
  image: string;
}

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function BlogsSection() {
  return (
    <section
      id="Blogs"
      aria-label="Tech Blogs Written By Our Community Developers To Help Developers!"
      className="relative  py-20 sm:py-10 z-1 bg-[#0c0b12]/80 bg-page-gradient"
    >
      <div className="absolute -z-1 inset-0 h-[600px] w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-0 z-[0] h-screen opacity-20 w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-x-0 -top-10 opacity-50 z-10 m-auto h-[27rem] max-w-lg sm:h-64 sm:max-w-7xl"></div>
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-geist text-3xl tracking-tighter text-gray-100 sm:text-6xl">
            <span className='bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent'>Blogs</span>
          </h2>
          <p className="mt-4 text-lg tracking-tight text-gray-300 font-geist">
            Tech Blogs Written By Our Community Developers To Help Developers!
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {Blogs.map((blog: Blog, index: number) => (
            <li key={index}>
              <figure className="relative rounded-2xl bg-black/60 transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] p-6 shadow-xl">
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
                  <span className="bg-purple-600 text-white text-xs font-bold uppercase px-2 py-1 rounded-lg">Article</span>
                  <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
                  <p className="mt-2 text-gray-400">{blog.content}</p>
                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={blog.image}
                        alt={blog.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
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
