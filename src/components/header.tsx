"use client";

import { ThemeToggle } from "./theme-toggle";
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger, 
  useSidebar 
} from "./ui/sidebar";
import { Button } from "./ui/button";
import Link from 'next/link';
import { Menu } from "lucide-react";

const navItems = [
    { href: '/', label: 'হোম' },
    { href: '/tutorial', label: 'টিউটোরিয়াল' },
    { href: '/about', label: 'আমাদের সম্পর্কে' },
    { href: '/contact', label: 'যোগাযোগ' },
];

function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
           <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold sm:inline-block font-headline text-lg text-primary">
              Ôkkhor Sadhona
            </span>
          </Link>
        </SidebarHeader>
        <SidebarMenu>
          {navItems.map((item) => (
             <SidebarMenuItem key={item.label}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton onClick={() => setOpenMobile(false)}>{item.label}</SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}


export default function AppHeader() {
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
            <SidebarTrigger>
                <Menu />
            </SidebarTrigger>
             <AppSidebar />
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
