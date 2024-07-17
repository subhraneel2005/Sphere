import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


function Navbarr() {
  return (
    <div className='bg-transparent w-full py-4 px-6  flex justify-between'>
      <div className='flex justify-center items-center gap-2 cursor-pointer'>
      <h1 className='text-2xl font-bold text-white'>Sphere</h1>
      <img className='md:w-[40px] md:h-[40px] w-[34px] h-[34px]' src="/icon.png" alt="icon" />
      </div>
      <SignedOut>
        <SignInButton>
          <button className='text-2xl cursor-pointer text-gray-200 font-semibold'>Log In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Navbarr