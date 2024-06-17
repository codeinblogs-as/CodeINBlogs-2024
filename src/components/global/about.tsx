import React from 'react';
import Image from 'next/image';
import AboutImg from '../images/aboutimg.jpg';

const WhoWeAre = () => {
    return (
        <section className="relative about-bg py-8 px-4 md:px-8">
            <div className="max-w-screen-xl mx-auto backdrop-blur-4xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[#0c0b12] opacity-90"></div>
                <div className="relative z-10 gap-12 items-center lg:flex">
                    <div className="flex-1 max-w-lg py-5 mr-6 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                        <span className="max-w-40 mb-2 truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-xl text-xs border-[0.5px] border-[#131215] font-medium bg-[#06040c] text-[#e1e1e4]/80">Who We Are?</span>
                        <h3 className="text-2xl font-bold md:text-4xl bg-gradient-to-b bg-clip-text text-transparent from-[#483D8B]/90 to-[#FFB6C1]/90 mb-3">
                            Your Ultimate Destination <span className="bg-gradient-to-b bg-clip-text text-transparent from-[#483D8B] to-[#FFB6C1]">CodeINBlogs</span>
                        </h3>
                        <p className="text-zinc-100 leading-relaxed">
                            CodeINBlogs, your ultimate destination for valuable resources and insightful articles tailored for developers across all domains. Join our vibrant community and explore a wealth of knowledge curated to inspire and empower your coding journey. Whether you&apos;re a seasoned professional or just starting out, CodeINBlogs is here to support your growth and success in the world of programming.
                        </p>
                        <a
                            className="mt-5 px-4 py-2 text-indigo-200 font-medium bg-[#12111d] rounded-full inline-flex items-center border border-1 border-gray-800"
                            href="#"
                        >
                            Explore Events
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                        <div className="relative rounded-2xl overflow-hidden w-full">
                            <Image
                                src={AboutImg}
                                width={1000} // Adjust this value to match your desired height in pixels
                                height={300}
                                className="px-2 brightness-0 invert"
                                alt='logo'
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#483D8B]/35 to-[#FFB6C1]/35 opacity-20 hover:opacity-0 transition duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
