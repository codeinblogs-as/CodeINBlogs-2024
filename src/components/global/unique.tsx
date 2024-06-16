import React from 'react';
import UniqueCards from '../ui/unique-cards';
import Image from 'next/image'; // Import the Next.js Image component

const UniqueSection = () => {
    return (
        <section className="p-8 border-t-2 border-gray-900 relative flex items-center justify-center backdrop-blur-3xl">
            <Image
                src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
                className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-40"
                alt="Background image"
                layout="fill" // Use layout fill for background image
                objectFit="cover" // Ensure the image covers the background
                quality={50} // Adjust quality for performance
            />
            <div className="relative z-10">
                <div className="max-w-xl mx-auto space-y-4 p-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter bg-gradient-to-b bg-clip-text text-transparent from-[#483D8B] to-[#CBD5E0]">
                        Why We&apos;re Unique
                    </h2> {/* Escape the single quote */}
                </div>
                <div className="">
                    <UniqueCards />
                </div>
            </div>
        </section>
    );
};

export default UniqueSection;
