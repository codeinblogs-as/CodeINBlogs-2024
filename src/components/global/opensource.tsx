import { Globe } from "../ui/Globe/globe";

const OpenSource = () => {
  return (
    <section className="relative about-bg py-8 px-4 md:px-8 border-t-2 border-b-2 border-gray-900">
      <div className="max-w-screen-xl mx-auto backdrop-blur-4xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0c0b12] opacity-90"></div>

        <div className="relative z-10 items-center lg:flex">
          <div className="relative flex-1 mx-auto sm:w-full lg:w-1/2">
            <div className="max-w-[400px] mx-auto lg:max-w-[250px} mx-auto lg:mx-0"> 
              <Globe className="w-full" /> {/* Adjust width as needed */}
            </div>
          </div>
          <div className="flex-1 max-w-lg py-5 mr-6 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
            <h3 className="text-2xl font-bold text-white/80 md:text-4xl bg-gradient-to-b bg-clip-text mb-3">
              We Love{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 via-[#2dba4e]/40  to-indigo-700">
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
Contribute Now              <svg
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
    </section>
  );
};

export default OpenSource;
