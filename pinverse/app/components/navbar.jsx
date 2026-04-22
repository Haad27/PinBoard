"use client"
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';

const Navbar = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

   useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    router.push(`/?search=${query}`);
  }

  return (
    <nav className='w-full bg-white shadow-md px-4 md:px-8 py-3 relative'>
       <div className='flex items-center justify-between container mx-auto gap-5'>

        <div className='flex items-center space-x-4'>
          <img src="/logoo.jpg" alt="Logo" className='w-17 h-15' priority={true} />

          <Link href="/" className='hidden sm:block text-gray-800 text-xl hover:text-blue-500'>
            Home
          </Link>

          <Link href="/upload-pin" className='hidden sm:block text-gray-800 text-xl hover:text-blue-500'>
            Create Pin
          </Link>
        </div>
         <div className='hidden sm:block w-1/2 '>
          <div className='relative'>
            <input type="text" placeholder='search' className='w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none
   focus:ring-2 focus:ring-blue-500 pr-12'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search onClick={handleSearch} className='absolute right-4 top-1/2 transform -translate-y-1/2
rounded-full w-8 h-8 p-1 transition-all duration-300 hover:bg-blue-700 cursor-pointer'/>
          </div>
        </div>
        </div>
    </nav>
  )

}