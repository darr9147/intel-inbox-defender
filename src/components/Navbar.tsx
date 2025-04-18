
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Shield, User, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Reports', href: '/reports' },
    { name: 'Threat Map', href: '/threat-map' },
    { name: 'News', href: '/news' },
    { name: 'Case Studies', href: '/case-studies' }
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`text-gray-300 hover:text-white transition-colors ${
            location.pathname === item.href ? "text-white font-medium" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">Email Sentinel Vision</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center">
                    <span className="mr-2">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 text-gray-300 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer hover:bg-gray-700 hover:text-white">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-gray-700 hover:text-white"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">Sign up</Button>
                </Link>
              </>
            )}
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
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile">
                          <Button variant="ghost" className="w-full text-left text-gray-300 hover:text-white">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          className="w-full text-left text-gray-300 hover:text-white"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                            Log in
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign up</Button>
                        </Link>
                      </>
                    )}
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
