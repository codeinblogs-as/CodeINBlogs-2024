import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/global/Navbar'

export default function AboutPage() {
  return (
    <main className="bg-[#010314] min-h-screen">
      <Navbar />

      <section className="flex justify-center items-center w-[1440px] h-[583px] px-[151px] py-[7px] mx-auto">
        <div className="flex justify-between items-center w-full">
          {/* Left Content */}
          <div className="max-w-[600px]">
            <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm mb-6">
              ABOUT US
            </span>

            <h1 className="text-white text-[38px] font-normal leading-[52px] tracking-[0.76px] capitalize mb-6">
              Your Ultimate Destination -
              <br />
              <span className="text-[36px]">CodeINBlogs</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              Discover a powerful platform and vibrant community dedicated to fostering learning, collaboration, and innovation. Dive into our{' '}
              <span className="text-white">Learning Hub, explore exclusive blogs, and participate in hands-on coding experiences.</span>
              {' '}Benefit from mentorship, engage in hackathons, and elevate your coding skills. Join us on a journey of growth and discovery at CodeINBlogs!
            </p>

            <Link
              href="/join"
              className="inline-block px-8 py-4 text-white text-lg font-medium rounded-lg
                        bg-gradient-to-r from-purple-600/20 to-blue-600/20
                        border border-purple-500/50
                        transition-all duration-300
                        relative
                        after:content-['']
                        after:absolute after:inset-0
                        after:bg-gradient-to-r after:from-purple-500/50 after:to-blue-500/50
                        after:rounded-lg after:-z-10 after:blur-xl"
            >
              Join CodeINBlogs Community →
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="flex flex-col justify-center items-center w-[429px] h-[492px] p-[43px_0px_42.714px_0px] bg-[#02051A] rounded-[1.714px]">
            <Image
              src="/about-illustration.png"
              alt="CodeINBlogs Community Illustration"
              width={429}
              height={406}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center w-[1440px] px-[121px] py-[7px] gap-[10px] mx-auto">
        <div className="flex justify-between items-center w-full gap-16">
          {/* Left side - Illustration */}
          <div className="flex-1 inline-flex flex-col justify-end items-center p-[3.5px_2.5px_0px_0px] bg-[#02051A] rounded-[1.714px]">
            <Image
              src="/why-codeinblogs-illustration.png"
              alt="Developer working on laptop"
              width={600}
              height={600}
              className="object-contain"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm w-fit">
              WHY CODEINBLOGS
            </span>

            <h2 className="text-white text-4xl font-bold leading-tight">
              Democratizing Access To Coding Resources
            </h2>

            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full max-h-[80px] bg-gradient-to-b from-purple-500 to-blue-500" />
              <p className="text-gray-400 text-lg pl-6">
                Discover why CodeINBlogs is the preferred choice for developers seeking to enhance their skills and connect with like-minded individuals. Join our platform to access high-quality coding tutorials, collaborative projects, and expert mentorship, all in one place.
              </p>
            </div>

            <Link
              href="/coding-resources"
              className="inline-block px-8 py-4 text-white text-lg font-medium rounded-lg
                        bg-gradient-to-r from-purple-600/20 to-blue-600/20
                        border border-purple-500/50
                        transition-all duration-300
                        relative w-fit
                        after:content-['']
                        after:absolute after:inset-0
                        after:bg-gradient-to-r after:from-purple-500/50 after:to-blue-500/50
                        after:rounded-lg after:-z-10 after:blur-xl"
            >
              Coding Resources →
            </Link>
          </div>
        </div>
      </section>

      {/* founder section */}
      <section className="flex justify-center items-center w-[1138px] h-[569px] gap-[112px] mx-auto">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm w-fit">
            WHO FOUNDED
          </span>

          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full max-h-[80px] bg-gradient-to-b from-purple-500 to-blue-500" />
            <p className="text-gray-400 text-lg pl-6">
              Get to know Anshul Soni, the visionary founder behind CodeINBlogs. As a young entrepreneur and full-stack developer, Anshul's passion for technology and commitment to fostering learning have shaped CodeINBlogs into a vibrant community hub for developers of all ages.
            </p>
          </div>

          <Link
            href="/about-founder"
            className="inline-block px-8 py-4 text-white text-lg font-medium rounded-lg
                bg-gradient-to-r from-purple-600/20 to-blue-600/20
                border border-purple-500/50
                transition-all duration-300
                relative w-fit
                after:content-['']
                after:absolute after:inset-0
                after:bg-gradient-to-r after:from-purple-500/50 after:to-blue-500/50
                after:rounded-lg after:-z-10 after:blur-xl"
          >
            Meet Our Founder →
          </Link>
        </div>

        {/* Right Illustration */}
        <div className="flex flex-col justify-center items-center w-[429px] h-[492px] p-[13.5px_10px_13.5px_11px] bg-[#02051A] rounded-[1.714px] flex-shrink-0">
          <Image
            src="/founder.png"
            alt="CodeINBlogs founder illustration"
            width={405}
            height={465}
            className="object-contain"
            priority
          />
        </div>
      </section>





    </main>
  )
}

