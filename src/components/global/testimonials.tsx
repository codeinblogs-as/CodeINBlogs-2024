import { FC } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Ravi Sharma',
    profession: 'Full Stack Developer',
    description:
      "CodeINBlogs has been my go-to platform for learning and sharing knowledge. The community here is incredibly supportive, and I've gained valuable insights from fellow developers that have helped me grow professionally.",
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    name: 'Aditi Rao',
    profession: 'Software Engineer',
    description:
      "I've attended several CodeINBlogs workshops and events, and each time, I've come away with practical skills and new ideas. The team's commitment to organizing informative sessions makes it a standout community for developers.",
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    name: 'Priya Verma',
    profession: 'Android Developer',
    description:
      "As an Android developer, CodeINBlogs helped me a lot in solving coding errors whether it's in server-side or client-side. They were always there to assist.",
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    name: 'Arjun Mehta',
    profession: 'Mobile App Developer',
    description:
      "The mentorship I've received at CodeINBlogs has been invaluable. Experienced developers in the community have guided me through challenges, offering practical advice that has accelerated my learning and career growth.",
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    name: 'Neha Gupta',
    profession: 'Backend Developer',
    description:
      "Joining CodeINBlogs has connected me with like-minded developers who share my passion for backend development. The collaborative projects and discussions have broadened my perspective and deepened my technical expertise.",
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    name: 'Vikram Singh',
    profession: 'AI Developer',
    description:
      "CodeINBlogs community developers are so supportive. They helped me in testing my SaaS AI product and provided valuable feedback for improvement. I recommend every developer starting their coding journey to join this community.",
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
];

interface TestimonalCardProps {
  name: string;
  description: string;
  image: string;
  profession: string;
}

const TestimonialCard: FC<TestimonalCardProps> = ({
  name,
  description,
  image,
  profession,
}) => {
  return (
    <div
      className={`card-shadow relative flex h-auto max-w-[22rem] select-none flex-col items-start justify-center overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-sm border-neutral-950 hover:shadow-white/10`}
    >
      <div className="absolute left-0 top-0 h-52 w-52 rounded-2xl bg-[#483D8B]/80 opacity-30 blur-3xl"></div>
      <div className="mb-0 flex h-fit flex-row items-center gap-3">
        <Image
          className="m-0 block h-11 w-11 rounded-full object-cover"
          src={image}
          alt={image}
          width={120}
          height={80}
        />
        <div className="mb-0 flex h-fit flex-col items-start">
          <h3 className="m-0 text-base font-medium text-gray-100">
            {name}
          </h3>
          <p className="font-regular m-0 text-center text-sm text-gray-400">
            {profession}
          </p>
        </div>
      </div>
      <p className="mb-0 mt-3 text-left text-sm font-light md:text-base text-gray-400">
        {description}
      </p>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className='testimonials'>
    <div className="flex flex-col items-center justify-center gap-5 py-12 bg-gradient-to-br from-black/30 via-black/80 to-black/60 bg-opacity-60 backdrop-filter backdrop-blur-4xl">
      <h2 className="text-3xl font-bold md:text-4xl text-center mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#562e69] via-[#483D8B] to-[#4434b0]">
      What Developers Are Saying About CodeINBlogs
      </h2>
      <div className="relative mt-12 flex h-full w-full flex-col items-center justify-center gap-5 md:flex-row">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col justify-center gap-4">
            {testimonials
              .slice(colIndex * 2, colIndex * 2 + 2)
              .map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Testimonials;
