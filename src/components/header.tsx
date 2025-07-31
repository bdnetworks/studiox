"use client";

import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import Link from 'next/link';

const navItems = [
    { href: '/', label: 'হোম' },
    { href: '/contact', label: 'যোগাযোগ' },
    { href: '/services', label: 'সার্ভিস সমূহ' },
    { href: '/about', label: 'আমাদের সম্পর্কে' },
];


export default function AppHeader() {
  const { openMobile, setOpenMobile } = useSidebar();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block font-headline text-lg text-primary">
              Ôkkhor Sadhona
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
             {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:text-primary"
                >
                    {item.label}
                </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
             <SidebarTrigger />
        </div>


        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">

          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search bar here if needed */}
          </div>
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
       {openMobile && (
         <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setOpenMobile(false)} />
       )}
    </header>
  );
}
