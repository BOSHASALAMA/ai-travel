'use client'
import React from 'react'
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Destination = () => {
    const imageUrl1 = "/dest1.jpg"
    const imageUrl2 = "/dest2.jpg"
    const imageUrl3 = "/dest3.jpg"
    const imageUrl4 = "/dest4.png"
  return (
    <>
    <h1 className='text-center text-white text-5xl mt-40'>Top Destinations</h1>
    <div className='flex justify-center gap-8 flex-wrap px-5 py-10 '>
       <div className="relative  flex items-center justify-center md:flex-row flex-col">
      <DirectionAwareHover imageUrl={imageUrl1}>
        <p className="font-bold text-xl">Roma, Italy</p>
        <p className="font-normal text-sm">10 Days Trip</p>
      </DirectionAwareHover>
      <div className='md:hidden block text-white text-center mt-3'>
        <p className="font-bold text-xl">Roma, Italy</p>
        <p className="font-normal text-sm">10 Days Trip</p>
      </div>
    </div>
        <div className="relative  flex items-center justify-center md:flex-row flex-col">
      <DirectionAwareHover imageUrl={imageUrl2}>
        <p className="font-bold text-xl">London, UK</p>
        <p className="font-normal text-sm">12 Days Trip</p>
      </DirectionAwareHover>
      <div className='md:hidden block text-white text-center mt-3'>
        <p className="font-bold text-xl">London, UK</p>
        <p className="font-normal text-sm">12 Days Trip</p>
      </div>
    </div>
        <div className="relative  flex items-center justify-center md:flex-row flex-col">
      <DirectionAwareHover imageUrl={imageUrl3}>
        <p className="font-bold text-xl">Full Europe</p>
        <p className="font-normal text-sm">15 Days Trip</p>
      </DirectionAwareHover>
      <div className='md:hidden block text-white text-center mt-3'>
        <p className="font-bold text-xl">Full Europe</p>
        <p className="font-normal text-sm">15 Days Trip</p>
      </div>
    </div>
        <div className="relative  flex items-center justify-center md:flex-row flex-col">
      <DirectionAwareHover imageUrl={imageUrl4}>
        <p className="font-bold text-xl">Istanboul, Turkey</p>
        <p className="font-normal text-sm">10 Days Trip</p>
      </DirectionAwareHover>
      <div className='md:hidden block text-white text-center mt-3'>
        <p className="font-bold text-xl">Istanboul, Turkey</p>
        <p className="font-normal text-sm">10 Days Trip</p>
      </div>
    </div>
  
    </div>
    <div className="flex justify-end m-4" >
      <Link href="/destinationsList"><Button >see All <ArrowRight/></Button></Link>

    </div>
    </>
  )
}

export default Destination
