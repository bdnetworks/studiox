"use client";

import { ThemeToggle } from "./theme-toggle";
import { 
  Sheet,
  SheetContent,
  SheetTrigger, 
} from "./ui/sheet";
import { Button } from "./ui/button";
import Link from 'next/link';
import { Menu } from "lucide-react";
import React from "react";

const navItems = [
    { href: '/', label: 'হোম' },
    { href: '/tutorial', label: 'টিউটোরিয়াল' },
    { href: '/about', label: 'আমাদের সম্পর্কে' },
    { href: '/contact', label: 'যোগাযোগ' },
];

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-bold sm:inline-block font-headline text-lg text-primary">
            Ôkkhor Sadhona
          </span>
        </Link>
        <div className="flex flex-col space-y-3 pt-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}


export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
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

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search bar here if needed */}
          </div>
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
