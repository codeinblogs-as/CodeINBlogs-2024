"use client"  // Ensure this is at the very top of your component.

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import Logo from "@/../public/CodeINBlogs.png";
import LoginButton from '../ui/LoginButton';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
    name: string;
    link: string;
};

type Props = {
    user?: boolean;
};

const Navbar: React.FC<Props> = () => {
    const { isLoggedIn, logOut, profile } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const navItems: NavItem[] = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Blogs', link: '/allBlogs' },
        { name: 'Resources', link: '/resources' },
    ];

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [isDropdownOpen]);

    const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
        <ul className={`flex ${mobile ? 'flex-col' : 'flex-row'} items-center gap-4 list-none`}>
            {navItems.map((item, index) => (
                <motion.li
                    key={index}
                    initial={mobile ? { opacity: 0, y: 20 } : {}}
                    animate={mobile ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Link
                        href={item.link}
                        className={`text-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-2 text-white' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.name}
                    </Link>
                </motion.li>
            ))}
        </ul>
    );

    const UserMenu = ({ mobile = false }: { mobile?: boolean }) => (
        <div className={`relative ${mobile ? 'w-full' : ''}`}>
            <div
                className={`flex ${mobile ? 'flex-col' : 'space-x-4'} items-center cursor-pointer`}
                onClick={toggleDropdown}
            >
                {!mobile && profile?.profileImage ? (
                    <Image
                        src={profile.profileImage}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                    />
                ) : (
                    !mobile && (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )
                )}
                <span className={`text-bold ${mobile ? 'text-white' : 'text-white'} ${mobile ? 'mt-2' : ''}`}>
                    {profile?.firstName || 'Guest'} {profile?.lastName || ''}
                </span>
                {!mobile && (
                    <ChevronDown
                        className={`w-4 h-4 text-white cursor-pointer transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                        }}
                    />
                )}
            </div>
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`${mobile ? 'relative mt-2' : 'absolute right-0 mt-2'} w-48 rounded-md shadow-lg bg-[#080808] ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link
                                href="/dashboard"
                                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#171719]"
                            >
                                <LayoutDashboard className="mr-3 h-5 w-5" />
                                Dashboard
                            </Link>
                            <button
                                onClick={logOut}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-[#171719]"
                            >
                                <LogOut className="mr-3 h-5 w-5" />
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <>
            <header className='fixed mb-44 top-0 left-0 right-0 py-2 w-full bg-background/70 backdrop-blur-3xl z-[100] flex px-4 md:px-20 items-center border-b-[1px] border-neutral-900 justify-between'>
                <aside className='flex items-center gap-[2px]'>
                    <Image src={Logo} alt='CodeINBlogs Logo' className='w-28 md:w-36 h-auto' />

                </aside>

                <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
                    <NavLinks />
                </nav>

                <aside className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="hidden md:block">
                            <UserMenu />
                        </div>
                    ) : (
                        <div className="hidden md:block">
                            <LoginButton />
                        </div>
                    )}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <div className="relative">
                            {isLoggedIn ? (
                                <>
                                    <Image
                                        src={profile?.profileImage || '/default-profile.png'}
                                        alt={`${profile?.firstName || 'Guest'} ${profile?.lastName || ''}`}
                                        className="w-10 lg:hidden md:hidden sm:block h-10 rounded-full cursor-pointer"
                                        width={40}
                                        height={40}
                                        onClick={toggleDropdown}
                                    />
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 lg:hidden md:hidden sm:block w-48 rounded-md shadow-lg bg-[#080808] ring-1 ring-black ring-opacity-5"
                                            >
                                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <Link
                                                        href="/dashboard"
                                                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#171719]"
                                                    >
                                                        <LayoutDashboard className="mr-3 h-5 w-5" />
                                                        Dashboard
                                                    </Link>
                                                    <button
                                                        onClick={logOut}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-[#171719]"
                                                    >
                                                        <LogOut className="mr-3 h-5 w-5" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <div className='lg:hidden md:hidden sm:block'>
                                <LoginButton  />
                                </div>
                            )}
                        </div>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden relative w-10 h-10">
                                <span className="sr-only">Toggle menu</span>
                                <span className={`absolute block w-5 bg-white transition-all duration-300 ease-out h-0.5 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
                                <span className={`absolute block w-5 bg-white transition-all duration-300 ease-out h-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                <span className={`absolute block w-5 bg-white transition-all duration-300 ease-out h-0.5 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-[400px] bg-black p-0">
                            <div className="flex flex-col h-full">
                                <SheetHeader className="p-6 border-b border-neutral-800">
                                    <div className="flex justify-between items-center">
                                        <SheetTitle className="text-white text-2xl font-bold">Menu</SheetTitle>
                                        <button
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-white bg-transparent hover:text-gray-300 transition"
                                            aria-label="Close menu"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                </SheetHeader>
                                <nav className="flex flex-col gap-6 mt-8 p-6 flex-grow">
                                    <NavLinks mobile />
                                    {isLoggedIn ? (
                                        <div className="mt-6 pt-6 border-t border-neutral-800">
                                            <UserMenu mobile />
                                        </div>
                                    ) : (
                                        <div className="mt-6 pt-6 border-t border-neutral-800">
                                            <LoginButton />
                                        </div>
                                    )}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </aside>
            </header>
        </>
    );
};

export default Navbar;
