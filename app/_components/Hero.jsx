'use client'
import React from 'react'
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
     <div  className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-gray-950 antialiased bg-grid-white/[0.02] relative overflow-x-clip">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 flex flex-col justify-center">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 bg-opacity-50">
          Travel, enjoy <br /> and live a new and full life
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Best Destinations around the world
        </p>
        <div className='m-auto mt-4'>
        <Button>Find out more</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
