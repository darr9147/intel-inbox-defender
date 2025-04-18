
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Reports', href: '#reports' },
    { name: 'Threat Map', href: '#threat-map' },
    { name: 'News', href: '#news' },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {item.name}
        </a>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">IntelInbox</span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Log in
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign up</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] bg-gray-900 border-gray-800">
                <div className="flex flex-col space-y-6 mt-6">
                  <NavLinks />
                  <div className="flex flex-col space-y-4">
                    <Button variant="ghost" className="text-gray-300 hover:text-white">
                      Log in
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Sign up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
