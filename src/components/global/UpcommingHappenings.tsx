import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UpcomingHappenings = () => {
    const events = [
        {
            name: "Event Name 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt vel, eaque cupiditate tempore hic doloremque dignissimos optio expedita blanditiis at...",
            dateTime: "18th June 2024 & 5PM",
            imageSrc: "https://www.antonball.dev/static/7c1f1aa09bb3d5adbbcb5c77cf4c352b/5a46d/rectangle.png",
            eventType: "Bootcamp",
            registrationLink: "https://codeinblogs.co"
        },
        {
            name: "Event Name 2",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt vel, eaque cupiditate tempore hic doloremque dignissimos optio expedita blanditiis at...",
            dateTime: "20th June 2024 & 6PM",
            imageSrc: "https://www.antonball.dev/static/7c1f1aa09bb3d5adbbcb5c77cf4c352b/5a46d/rectangle.png",
            eventType: "Hackathon",
            registrationLink: "https://codeinblogs.co"
        },
        // Add more events as needed
    ];

    return (
        <section className="happenings border-t-2 border-b-2 border-gray-900">
            <div className="bg-[#0c0b12]/70 px-4 py-8">
                <h2 className="text-2xl md:text-4xl text-center mb-2 font-semibold tracking-tighter bg-gradient-to-b bg-clip-text text-transparent from-[#483D8B] to-slate-400">
                    Upcoming Happenings
                </h2>
                <p className="text-base md:text-lg text-center text-slate-100 mb-4">
                    Our Exciting Lineup of Live Sessions, Hackathons, Bootcamps, and More!
                </p>
                <div className='flex flex-col items-center'>
                    {events.map((event, index) => (
                        <div key={index} className="my-6 relative max-w-[900px] py-4 md:py-[32px] px-4 md:px-[75px] w-full happening-card border border-[#323232]/50 bg-opacity-20 py-3 px-6 backdrop-blur-8xl rounded-lg text-white shadow-lg">
                            {/* Badge for large screens (laptop and desktop) */}
                            <div className="hidden md:block absolute top-0 left-0 text-white px-2 py-1 border-r-[1px] border-b-[1px] border-[#131215] bg-[#06040c]/50 text-[#e1e1e4]/70 rounded-tl-lg rounded-br-lg">{event.eventType}</div>
                            {/* Badge for mobile devices */}
                            <div className="block md:hidden absolute bottom-0 right-0 px-2 py-1 rounded-tl-lg rounded-br-lg border-t-[1px] border-l-[1px] border-[#131215] bg-[#06040c]/70 text-[#e1e1e4]/80">{event.eventType}</div>
                            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">
                                <div className="w-full md:w-2/3 flex flex-col">
                                    <div className="text-4xl text-slate-100 font-semibold leading-tight">{event.name}</div>
                                    <div className="pt-3 text-base text-zinc-200 opacity-90">{event.description}</div>
                                    <div className="py-4 grid grid-cols-2 gap-5">
                                        <div className="flex flex-col">
                                            <div className="font-semi-bold text-xs md:text-base">Date &amp; Time</div>
                                            <div className="font-medium text-xs md:text-base">{event.dateTime}</div>
                                        </div>
                                        <div className="">
                                            <Link href={event.registrationLink} passHref>
                                                <button className="group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-gray-700 bg-gradient-to-tr from-[#12111d] to-[#483D8B]/50 px-4 py-1 text-xs md:text-base text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-gray-800 active:shadow-none">
                                                    <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-36 group-hover:w-36"></span>
                                                    <span className="relative font-medium">Register Now</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-center w-full md:w-1/3">
                                    <div className="w-250 h-250 rounded-2xl border-1 border-[#363A42]">
                                        <Image
                                            src={event.imageSrc}
                                            alt={event.name}
                                            width={250}
                                            height={250}
                                            className="HappeningIMG rounded-2xl"
                                        />


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingHappenings;
