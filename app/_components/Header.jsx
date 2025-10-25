'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const Header = () => {

const [userRole, setUserRole] = useState(null)

const {user} = useUser()

// use React state to toggle mobile menu instead of direct DOM manipulation
const [mobileOpen, setMobileOpen] = useState(false);

const syncUser = async()=>{
if(user?.id && user?.primaryEmailAddress?.emailAddress){
   try {
    const response = await fetch(`/api/user`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                userId:user.id,
                email:user.emailAddresses[0].emailAddress,
                name: user.fullName || user.firstName || 'User' 
            }),
        }
    )
    if(response.ok){
const userData = await response.json()
setUserRole(userData.role)
    }
   } catch (error) {
    console.error("Error syncinf user:" , error)
   }
} else{
    setUserRole(null)
   }
}

useEffect(()=>{
syncUser()
    },[user])
// no DOM access on server; toggle menu with React state on client
const isAdmin = userRole === 'admin'
const isUser = userRole === 'user'

  return (
    <div className='flex justify-center mt-6'>
      <nav className="flex items-center border mx-4 max-md:w-full max-md:justify-between border-slate-700 px-6  rounded-full text-white text-sm z-50">
 <Link href="/"><Image src="/logo.png" width={130} height={10} alt='' unoptimized={true} /></Link> 
    <div className="hidden md:flex items-center gap-6 ml-7">
        <Link href="/destinationsList" className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">Destinations</span>
            <span
                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Destinations</span>
        </Link>
        <Link href="/ai" className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">Ask Ai!</span>
            <span
                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Ask Ai!</span>
        </Link>
      {
        isUser && (
              <Link href="/bookings" className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">My Booking</span>
            <span
                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">My Booking</span>
        </Link>
        )
      }
      {
        isAdmin && (
              <Link href="/admin/add-destinations" className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">Add destination</span>
            <span
                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Add destination</span>
        </Link>
        )
      }

        <Link href="/testimonial" className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">Testimonial</span>
            <span
                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Testimonial</span>
        </Link>
    </div>
{!user ? (
     <div className="hidden ml-14 md:flex items-center gap-4 px-3">
        <SignInButton mode='modal' >
            <Button  >Sign In</Button>
            </SignInButton>
<SignUpButton>
           <Button  >Sign out</Button>
           </SignUpButton>

    </div>
):(
    <div className='px-4 ml-auto'>
<UserButton  afterSwitchSessionUrl='/' />
</div>
)}
   
    <button onClick={() => setMobileOpen((s) => !s)} className="md:hidden text-gray-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
    <div className={`absolute ${mobileOpen ? 'flex' : 'hidden'} top-24 text-base left-0 bg-gray-900 w-full flex-col items-center gap-4 mt-4`}>
       <Link href="/destinationsList" className='hover:text-gray-700 mt-6'>Destinations</Link>
       <Link href="/ai" className='hover:text-gray-700 mt-6'>Ask Ai!</Link>
{
    isUser && (
               <Link href="/bookings" className='hover:text-gray-700 mt-6'>my Booking</Link>

    )
}
{
    isAdmin && (
               <Link href="/admin/add-destinations" className='hover:text-gray-700 mt-6'>Add destination</Link>

    )
}
       <Link href="/testimonial" className='hover:text-gray-700 mt-6 mb-5'>Testimonial</Link>
      
{
    !user && (
            <div className=" flex gap-4 px-3">
        <SignInButton mode='modal' >
            <Button className="mb-3" >Sign In</Button>
            </SignInButton>
<SignUpButton>
           <Button className="mb-3" >Sign out</Button>
           </SignUpButton>

    </div>
    )
}
    </div>
</nav>

    </div>
  )
}

export default Header
