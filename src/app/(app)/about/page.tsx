import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/global/Navbar';
import GradientButton from '@/components/ui/gradient-about-button';
export default function AboutPage() {
    return (
        <main className="bg-[#010314] min-h-screen">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-12 pt-20 space-y-20">
                {/* About Us Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="lg:w-[55%] space-y-6">
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
                            src="/about-illustration.png"
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
                            src="/why-codeinblogs-illustration.png"
                            alt="Developer working on laptop"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="lg:w-[55%] space-y-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            WHY CODEINBLOGS
                        </span>

                        <h2 className="text-white text-3xl font-bold leading-tight">
                            Democratizing Access To Coding Resources
                        </h2>

                        <div className="relative pl-6">
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                            <p className="text-gray-400 text-lg">
                                Discover why CodeINBlogs is the preferred choice for developers seeking to enhance their skills and connect with like-minded individuals. Join our platform to access high-quality coding tutorials, collaborative projects, and expert mentorship, all in one place.
                            </p>
                        </div>

                        <GradientButton href="/coding-resources" text="Coding Resources  " />
                    </div>
                </section>

                {/* Founder Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="lg:w-[55%] space-y-6">
                        <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            WHO FOUNDED
                        </span>
                        <h2 className="text-white text-3xl font-bold leading-tight">
                            Meet Our Founder, Anshul Soni
                        </h2>
                        <div className="relative pl-6">
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                            <p className="text-gray-400 text-lg">
                                Get to know Anshul Soni, the visionary founder behind CodeINBlogs. As a young entrepreneur and full-stack developer, Anshul's passion for technology and commitment to fostering learning have shaped CodeINBlogs into a vibrant community hub for developers of all ages.
                            </p>
                        </div>

                        <GradientButton href="/about-founder" text="Meet Our Founder" />
                    </div>

                    {/* Right Illustration */}
                    <div className="lg:w-[45%] bg-[#02051A] rounded-lg p-4 flex items-center justify-center">
                        <Image
                            src="/founder.png"
                            alt="CodeINBlogs founder illustration"
                            width={330}
                            height={330}
                            className="object-contain"
                            priority
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}
