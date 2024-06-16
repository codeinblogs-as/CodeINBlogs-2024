import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHandsHelping, faLaptopCode, faBriefcase, faNewspaper, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const UniqueCards = () => {

    const features = [
        {
            icon: <FontAwesomeIcon icon={faCogs} />,
            title: "Project Building Support",
            desc: "We provide guidance and resources to help you bring your project ideas to life, from concept to completion."
        },
        {
            icon: <FontAwesomeIcon icon={faHandsHelping} />,
            title: "Mentorship for Goal Achievement",
            desc: "Our experienced mentors offer personalized guidance to help you achieve your development goals effectively."
        },
        {
            icon: <FontAwesomeIcon icon={faLaptopCode} />,
            title: "Hands-On Live Sessions",
            desc: "Engage in interactive live sessions where industry experts share practical insights and tips to enhance your skills."
        },
        {
            icon: <FontAwesomeIcon icon={faBriefcase} />,
            title: "Live Hirings",
            desc: "Access live hiring events and resources tailored to help you land your dream job as a developer."
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} />,
            title: "Tech Blogs",
            desc: "Stay updated with our tech blogs and articles covering the latest trends, tools, and techniques in the industry."
        },
        {
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            title: "Learning Resources",
            desc: "Explore our comprehensive collection of resources designed to support your continuous learning and skill development."
        }
        
    ];

    return (
        <div className="mt-0">
            <div className="max-w-screen-xl mx-auto px-4 text-zinc-200 md:px-8">
                <div className="mt-0">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 ">
                        {features.map((item, idx) => (
                            <li key={idx} className="flex gap-x-4 bg-gradient-to-r from-indigo-950/10 to-violet-950/10 border border-[#323232]/50 bg-opacity-20 py-10 px-6 backdrop-blur-3xl rounded-lg">
                                <div className="flex-none w-12 h-12 bg-[#13131f]/20 rounded-lg flex items-center justify-center p-2">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg text-slate-100 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p className="mt-3">
                                        {item.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UniqueCards;
