import { Globe } from "../ui/Globe/globe";
const OpenSource = () => {
  return (
    <section className="relative opensource">
    <div className="bg-gradient-to-br from-black/60 via-black/90 to-black/90 bg-opacity-60 backdrop-filter backdrop-blur-4xl py-8 px-4 md:px-8  border-t-2 border-b-2 border-gray-900">
      <div className="max-w-screen-xl mx-auto ">
        <div className="absolute top-0 left-0 w-full h-full "></div>

        <div className="relative z-10 items-center lg:mx-28 lg:flex">
          <div className="relative flex-1 mx-auto sm:w-full lg:w-1/2">
            <div className="max-w-[400px] mx-auto lg:max-w-[250px} mx-auto lg:mx-0">
              <Globe className="w-full" />
            </div>
          </div>
          <div className="flex-1 max-w-lg py-5 mr-6 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
            <h3 className="text-2xl font-bold text-white/80 md:text-4xl bg-gradient-to-b bg-clip-text mb-3">
              We Love{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-400">
                Open Source
              </span>
            </h3>
            <p className="text-zinc-100 leading-relaxed">
              We love open source! It’s all about collaboration and community,
              bringing developers together to share ideas and solve problems.
              Transparency and trust come from open code, building a reliable
              foundation. This freedom takes towards innovation, letting us
              customize and create. Learning and growth happen naturally as we
              contribute and gain real-world skills. We believe in giving back,
              helping the next generation of developers. Plus, open source
              ensures sustainability, keeping great tools evolving for everyone.
              Join us on this journey!
            </p>
            <a
              className="mt-5 px-4 py-2 text-indigo-200 font-medium bg-[#12111d] rounded-full inline-flex items-center border border-1 border-gray-800"
              href="#"
            >
              <div className="flex">
                <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 496 512"><path fill="#c7d2fe" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>          </div>
                Contribute Now
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
      </div>
      </div>

    </section>
  );
};

export default OpenSource;
