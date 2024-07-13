import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Logo from "@/../public/CodeINBlogs.png";
import LoginButton from '../ui/LoginButton';

type NavItem = {
  name: string;
  link: string;
};

type Props = {
  user?: boolean;
};

const Navbar: React.FC<Props> = ({ user }) => {
  const navItems: NavItem[] = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About',
      link: '/about',
    },
    {
      name: 'Blogs',
      link: '/blogs',
    },
    {
      name: 'Resources',
      link: '/resources',
    },
  ];

  return (
    <>
      <header className='fixed top-0 left-0 right-0 py-2 w-full bg-background/70 backdrop-blur-3xl z-[100] flex px-20 items-center border-b-[1px] border-neutral-900 justify-between'>
        <aside className='flex items-center gap-[2px]'>
          <Image src={Logo} alt='CodeINBlogs Logo' className='w-36 h-auto' />
        </aside>
        <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
          <ul className="flex items-center gap-4 list-none">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="z-10 flex min-h-fit items-center justify-center">
          {/* Add any additional elements here */}
        </div>
        <aside className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="flex overflow-hidden rounded-full bg-background">
              <AnimatedGradientText>
                <span className={cn(`animate-gradient flex bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`)}>
                  🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" /> dashboard
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </Link>
          ) : (
            <LoginButton />
          )}
        </aside>
      </header>
      <div className="pt-16"></div> {/* Add this to offset the content for the fixed navbar */}
    </>
  );
};

export default Navbar;
