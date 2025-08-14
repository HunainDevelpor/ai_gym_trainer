import { SignedIn, SignInButton, SignOutButton } from '@clerk/nextjs'
import React from 'react'

const Homepage = () => {
  return (
    <div>
      Homepage
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  )
}

export default Homepage