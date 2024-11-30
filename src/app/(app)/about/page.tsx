import Image from 'next/image';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Navbar from '@/components/global/Navbar';
import GradientButton from '@/components/ui/gradient-about-button';
import AboutCodeINBlogsIMG from './img/about-codeinblogs.png'
import AboutFounderIMG from './img/founder.png'
import WhyCodeINBlogsIMG from './img/why-codeinblogs-illustration.png'
import WhereCodeINBlogsIMG from './img/where-codeinblogs.png'
import WhoseCodeINBlogsIMG from './img/whose-community.png'

const checkerboardPattern = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="black"/>
  <rect x="100" width="100" height="100" fill="white"/>
  <rect y="100" width="100" height="100" fill="white"/>
  <rect x="100" y="100" width="100" height="100" fill="black"/>
</svg>
`;

const checkerboardDataUrl = `data:image/svg+xml;base64,${Buffer.from(checkerboardPattern).toString('base64')}`;

const teamMembers = [
  {
    role: "Role",
    name: "NAME",
    socialCount: 3
  },
  {
    role: "Role",
    name: "NAME",
    socialCount: 3
  },
  {
    role: "Role",
    name: "Name",
    socialCount: 3
  },
  {
    role: "Role",
    name: "Name",
    socialCount: 2
  }
];

export default function AboutPage() {
    return (
        <main className="bg-[#010314] min-h-screen">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-12 pt-20 space-y-20">
                {/* About Us Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="lg:w-[55%] space-y-6 border-l-4 border-[#1c0e44]/70 pl-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            ABOUT US
                        </span>

                        <h1 className="text-white text-3xl font-bold leading-tight">
                            Your Ultimate Destination -<br />
                            <span className="text-2xl">CodeINBlogs</span>
                        </h1>

                        <p className="text-gray-400 text-lg">
                            Discover a powerful platform and vibrant community dedicated to fostering learning, collaboration, and innovation. Dive into our{' '}
                            <span className="text-white">Learning Hub, explore exclusive blogs, and participate in hands-on coding experiences.</span>{' '}
                            Benefit from mentorship, engage in hackathons, and elevate your coding skills. Join us on a journey of growth and discovery at CodeINBlogs!
                        </p>

                        <GradientButton href="/join" text="Join CodeINBlogs Community " />
                    </div>

                    {/* Right Illustration */}
                    <div className="lg:w-[45%] bg-[#02051A] rounded-lg p-4 flex items-center justify-center">
                        <Image
                            src={AboutCodeINBlogsIMG}
                            alt="CodeINBlogs Community Illustration"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>
                </section>

                {/* Why CodeINBlogs Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left side - Illustration */}
                    <div className="lg:w-[45%] bg-[#02051A] rounded-lg p-4 flex items-center justify-center">
                        <Image
                            src={WhyCodeINBlogsIMG}
                            alt="Developer working on laptop"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="lg:w-[55%] space-y-6 border-r-4 border-[#1c0e44]/70 pr-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            WHY CODEINBLOGS
                        </span>

                        <h2 className="text-white text-3xl font-bold leading-tight">
                            Democratizing Access To Coding Resources
                        </h2>

                        <p className="text-gray-400 text-lg ">
                            Discover why CodeINBlogs is the preferred choice for developers seeking to enhance their skills and connect with like-minded individuals. Join our platform to access high-quality coding tutorials, collaborative projects, and expert mentorship, all in one place.
                        </p>

                        <GradientButton href="/coding-resources" text="Coding Resources  " />
                    </div>
                </section>

                {/* Founder Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="lg:w-[55%] space-y-6 border-l-4 border-[#1c0e44]/70 pl-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            WHO FOUNDED
                        </span>
                        <h2 className="text-white text-3xl font-bold leading-tight">
                            Meet Our Founder, Anshul Soni
                        </h2>

                        <p className="text-gray-400 text-lg">
                            Get to know Anshul Soni, the visionary founder behind CodeINBlogs. As a young entrepreneur and full-stack developer, Anshul's passion for technology and commitment to fostering learning have shaped CodeINBlogs into a vibrant community hub for developers of all ages.
                        </p>

                        <GradientButton href="https://anshulsoni.com" text="Meet Our Founder" />
                    </div>

                    {/* Right Illustration */}
                    <div className="lg:w-[45%] bg-[#02051A] rounded-lg p-4 flex items-center justify-center">
                        <Image
                            src={AboutFounderIMG}
                            alt="CodeINBlogs founder illustration"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>
                </section>

                {/* Where CodeINBlogs */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left side - Illustration */}
                    <div className="lg:w-[45%] bg-[#02051A] rounded-lg p-4 flex items-center justify-center">
                        <Image
                            src={WhereCodeINBlogsIMG}
                            alt="Where CodeINBlogs - coders sitting on the glob and working on the laptop"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="lg:w-[55%] space-y-6 border-r-4 border-[#1c0e44]/70 pr-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            WHERE CODEINBLOGS
                        </span>

                        <h2 className="text-white text-3xl font-bold leading-tight">
                            Connecting Developers Globally
                        </h2>

                        <p className="text-gray-400 text-lg ">
                            Based in India, CodeINBlogs operates as a global platform, connecting developers from diverse backgrounds and geographical locations. Our virtual community transcends borders, enabling seamless collaboration and knowledge-sharing.
                        </p>

                        <GradientButton href="/coding-resources" text="Join Global Developer Network" />
                    </div>
                </section>

                {/* Whose CodeINBlogs */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="lg:w-[55%] space-y-6 border-l-4 border-[#1c0e44]/70 pl-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            WHOSE CODEINBLOGS
                        </span>
                        <h2 className="text-white text-3xl font-bold leading-tight">
                            A Community-Driven Platform for Developers
                        </h2>

                        <p className="text-gray-400 text-lg">
                            CodeINBlogs is a platform created by developers, for developers. Join our community-driven platform and become part of a supportive network where your ideas, aspirations, and contributions are valued and celebrated.
                        </p>

                        <GradientButton href="https://anshulsoni.com" text="Contribute To CodeINBlogs" />
                    </div>

                    {/* Right Illustration */}
                    <div className="lg:w-[45%] bg-[#02051A] rounded-lg p-4 flex items-center justify-center">
                        <Image
                            src={WhoseCodeINBlogsIMG}
                            alt="CodeINBlogs founder illustration"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>
                </section>

                {/* Team Section */}
                 
                {/* Team Section */}
                <section className="py-16 bg-[#02051A]">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-white text-center mb-4">
                            Meet the Team
                        </h2>
                        <p className="text-gray-400 text-center text-lg mb-16">
                            The passionate minds behind CodeINBlogs, inspiring and<br />
                            empowering the coding community
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index} 
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg">
                                        <Image
                                            src={checkerboardDataUrl}
                                            alt=""
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">{member.role}</p>
                                    <h3 className="text-white text-xl mb-4">{member.name}</h3>
                                    <div className="flex gap-2">
                                        {[...Array(member.socialCount)].map((_, i) => (
                                            <div 
                                                key={i}
                                                className="w-2 h-2 bg-gray-400 rounded-full"
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

