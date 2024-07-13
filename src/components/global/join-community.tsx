const JoinCommunity = () => {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 sm:py-16 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900/30 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stopColor="#7775D6" />
                            <stop offset="1" stopColor="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left">
                    <h2 className="text-3xl font-bold text-white sm:text-3xl">Community For Developers by Developers!</h2>
                    <p className="mt-3 text-lg leading-8 text-gray-200">
                        Stay updated on upcoming events and hackathons. We also offer mentorship in Web Development, App Development, Machine Learning, AI, and more.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Join WhatsApp Community</a>
                        <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Join Discord Community</a>
                       
                    </div>
                </div>
                <div className="relative mt-6 h-30 lg:mt-4">
                        <img className="absolute left-0 top-0 w-[80rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg" alt="CodeINBlogs" />
                    </div>
            </div>
        </div>
    );
};

export default JoinCommunity;
