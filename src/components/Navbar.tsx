// "use client"
// import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
// import {DumbbellIcon, HomeIcon, User2Icon, ZapIcon } from 'lucide-react';
// import Link from 'next/link';
// import React from 'react'
// import { Button } from './ui/button';

// const Navbar = () => {
//   const {isSignedIn} =useUser();
//     return (
//     <>
//     <header  className='top-0 fixed right-0 left-0 bg-background/60  border-border py-3 backdrop-blur-md border-b z-50'>
//       <div className="container mx-auto flex justify-between items-center">
//         {/* LOGO */}
//         <Link href="/" className="flex gap-2 items-center">
//         <div className='p-1 bg-primary/10 rounded'>
//             <ZapIcon className='w-4 h-4 text-primary' />
//         </div>
//             <span className='text-xl font-bold font-mono'>
//               code<span className='text-primary'>flex</span>.ai</span>
//         </Link>
//       {/* Navigation */}
//       <nav className='flex items-center gap-5'>
//         {isSignedIn?(
//           <>
//           <Link href="/" className='flex gap-1.5 items-center sm:text-xs text-sm hover:text-primary transition-colors'>
//           <HomeIcon size={16} className='' />
//           <span>Home</span>
//           </Link>
//             <Link href="/generate-program"  className='flex gap-1.5 items-center text-sm hover:text-primary transition-colors'>
//               <DumbbellIcon size={16} />
//               <span>Generate</span>
//             </Link>
//             <Link href="/profile" className='flex gap-1.5 items-center text-sm hover:text-primary transition-colors'>
//               <User2Icon size={16} />
//               <span>Profile</span>
//             </Link>
//             <Button asChild variant={'outline'} className='ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10'>
//                 <Link href="/generate-program">Get Started</Link>
//             </Button>
//             <UserButton/>
//           </>
//         ):(
//           <>
//           <SignInButton>
//             <Button className=' text-primary hover:text-white  hover:bg-primary/10' variant={'outline'}>
//               Sign In
//             </Button>
//           </SignInButton>
//           <SignUpButton>
//             <Button className='bg-primary text-primary-foreground   hover:bg-primary/90' variant={"ghost"}>
//               Sign Up
//             </Button>
//           </SignUpButton>
//           </>
//         )}

//       </nav>
//       </div>
//     </header>
//     </>
//   )
// }

// export default Navbar


"use client"

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { DumbbellIcon, HomeIcon, User2Icon, ZapIcon, MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  const { isSignedIn } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="top-0 fixed right-0 left-0 bg-background/60 border-border py-3 backdrop-blur-md border-b z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex gap-2 items-center">
            <div className="p-1 bg-primary/10 rounded">
              <ZapIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xl font-bold font-mono">
              code<span className="text-primary">flex</span>.ai
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {isSignedIn ? (
              <>
                <Link
                  href="/"
                  className="flex gap-1.5 items-center text-sm hover:text-primary transition-colors"
                >
                  <HomeIcon size={16} />
                  <span>Home</span>
                </Link>
                <Link
                  href="/generate-program"
                  className="flex gap-1.5 items-center text-sm hover:text-primary transition-colors"
                >
                  <DumbbellIcon size={16} />
                  <span>Generate</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex gap-1.5 items-center text-sm hover:text-primary transition-colors"
                >
                  <User2Icon size={16} />
                  <span>Profile</span>
                </Link>
                <Button
                  asChild
                  variant={"outline"}
                  className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  <Link href="/generate-program">Get Started</Link>
                </Button>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton>
                  <Button
                    className="text-primary hover:text-white hover:bg-primary/10"
                    variant={"outline"}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    variant={"ghost"}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </nav>

          {/* Mobile Menu Button + User */}
          <div className="flex items-center gap-3 md:hidden">
            {isSignedIn && <UserButton />}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-primary/10 transition"
            >
              {menuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden bg-background/95 border-t border-border backdrop-blur-md transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 p-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1.5 items-center text-sm hover:text-primary transition-colors"
                >
                  <HomeIcon size={16} />
                  <span>Home</span>
                </Link>
                <Link
                  href="/generate-program"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1.5 items-center text-sm hover:text-primary transition-colors"
                >
                  <DumbbellIcon size={16} />
                  <span>Generate</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1.5 items-center text-sm hover:text-primary transition-colors"
                >
                  <User2Icon size={16} />
                  <span>Profile</span>
                </Link>
                <Button
                  asChild
                  variant={"outline"}
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  <Link href="/generate-program" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <SignInButton>
                  <Button
                    className="text-primary hover:text-white hover:bg-primary/10"
                    variant={"outline"}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    variant={"ghost"}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar
