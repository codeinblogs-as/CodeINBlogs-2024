const JoinCommunity = () => {
    return (
        <section className="JoinCommunity">
            <div className=" bg-gradient-to-br from-black/40 via-black/60 to-black/40 bg-opacity-90 backdrop-filter backdrop-blur-4x">
                <div className="mx-auto max-w-7xl sm:px-6 sm:py-8 lg:px-8  ">
                    <div className="relative isolate overflow-hidden bg-black/40 backdrop-filter backdrop-blur-4xl px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 max-h-[80vh]">
                        <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#7775D6" />
                                    <stop offset="1" stopColor="#2b3549" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left">
                            <h2 className="text-3xl font-bold text-white sm:text-3xl">Community For Developers by Developers!</h2>
                            <p className="mt-3 text-lg leading-8 text-gray-200">
                                Stay updated on upcoming events and hackathons. We also offer mentorship in Web Development, App Development, Machine Learning, AI, and more.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <a
                                    className=" px-4 py-2 text-green-200 font-medium bg-[#111d1b]/60 rounded-full inline-flex items-center border border-1 border-gray-800"
                                    href="#"
                                >
                                    <div className="flex">
                                        <div className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                            </svg>
                                        </div>
                                        Join WhatsApp Community
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 ml-1 duration-150"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="relative mt-6 h-30 lg:mt-4">
                            <img className="absolute left-0 top-0 w-[80rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg" alt="CodeINBlogs" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinCommunity;
