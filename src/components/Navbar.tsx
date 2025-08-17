"use client"
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import {DumbbellIcon, HomeIcon, User2Icon, ZapIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

const Navbar = () => {
  const {isSignedIn} =useUser();
    return (
    <>
    <header  className='top-0 fixed right-0 left-0 bg-background/60  border-border py-3 backdrop-blur-md border-b z-50'>
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex gap-2 items-center">
        <div className='p-1 bg-primary/10 rounded'>
            <ZapIcon className='w-4 h-4 text-primary' />
        </div>
            <span className='text-xl font-bold font-mono'>
              code<span className='text-primary'>flex</span>.ai</span>
        </Link>
      {/* Navigation */}
      <nav className='flex items-center gap-5'>
        {isSignedIn?(
          <>
          <Link href="/home" className='flex gap-1.5 items-center text-sm hover:text-primary transition-colors'>
          <HomeIcon size={16} />
          <span>Home</span>
          </Link>
            <Link href="/generate-program"  className='flex gap-1.5 items-center text-sm hover:text-primary transition-colors'>
              <DumbbellIcon size={16} />
              <span>Generate</span>
            </Link>
            <Link href="/profile" className='flex gap-1.5 items-center text-sm hover:text-primary transition-colors'>
              <User2Icon size={16} />
              <span>Profile</span>
            </Link>
            <Button asChild variant={'outline'} className='ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10'>
                <Link href="/generate-program">Get Started</Link>
            </Button>
            <UserButton/>
          </>
        ):(
          <>
          <SignInButton>
            <Button className=' text-primary hover:text-white  hover:bg-primary/10' variant={'outline'}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className='bg-primary text-primary-foreground   hover:bg-primary/90' variant={"ghost"}>
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