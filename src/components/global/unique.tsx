import React from 'react';
import UniqueCards from '../ui/unique-cards';
import Image from 'next/image';

const UniqueSection = () => {
    return (
        <section className="px-8 py-4 border-t-2 border-b-2 border-gray-900 relative flex items-center justify-center backdrop-blur-3xl">
            <Image
                src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
                alt="Background image"
                className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-40"
                width={650}
                height={750}
                quality={50}
            />
            <div className="relative z-10">
                <div className="max-w-xl mx-auto space-y-4 p-6 text-center">
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter bg-gradient-to-b bg-clip-text text-transparent from-[#483D8B] to-[#CBD5E0]">
                        Why We&apos;re Unique
                    </h2>
                </div>
                <div className="">
                    <UniqueCards />
                </div>
            </div>
        </section>
    );
};

export default UniqueSection;
