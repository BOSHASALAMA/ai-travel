'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const destinationsList = () => {
const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true);
  const [navigatingId, setNavigatingId] = useState(null);
  const router = useRouter();

 useEffect(() => {
        fetchDestinations();
    }, []);

  const fetchDestinations = async ()=> {
    try {
      const response = await fetch ("/api/destinations")

      const result =  await response.json()
      console.log(result)
      setDestinations(result.data)
    // destinationss = result.data

    } catch (error) {
       console.error('Error:', error);

    }finally{
      setLoading(false)
    }
  }
    if(loading){
return(
    <div className='flex justify-center items-center h-[65vh]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-b-slate-600'></div>
    </div>
)
    }
  return (
    <div className='min-h-screen text-white  '>
        <div className='max-w-7xl mx-auto px-4 '>
<h4 className='font-bold py-5'>Destinations</h4>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-7'>
{destinations.length>0 ?(
  destinations.map((dest , i)=>(
<div key={i} className='rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
     <div className="relative  flex items-center justify-center md:flex-row flex-col">
      <DirectionAwareHover  imageUrl={dest.imageUrl}>
        <h5>{dest.name}</h5>
  <div className='flex'>    
            <MapPin/>
            <p className="font-bold text-xl px-2">{dest.city}, {dest.country}</p>
    
    </div>
            <div>
            <p className='truncate'>{dest.description}</p>
        </div>
           <div className='flex'>
            <strong className='pr-7'>{dest.price} $</strong><span className='flex'><Plane/> {dest.duration} days Trip </span>
            </div> 
             <div className='flex justify-start py-4 '>
          <Button
            className="w-full"
            onClick={() => {
              setNavigatingId(dest?.id);
              router.push(`/destinationsList/${dest?.id}`);
            }}
            disabled={navigatingId === dest?.id}
          >
            {navigatingId === dest?.id ? (
              <div className="flex items-center justify-center w-full">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Booking...
              </div>
            ) : (
              'Book Now'
            )}
          </Button>

  </div>
      </DirectionAwareHover>
      <div className='md:hidden block text-white text-center mt-3'>
        <div className='py-1.5'>
    <h5>{dest.name}</h5>
    <div className='flex'>    
            <MapPin/>
            <p className="font-bold text-xl px-2">{dest.city}, {dest.country}</p>
    
    </div>

        <div className='py-1.5'>
            <p className='truncate'>{dest.description}</p>
        </div>
           <div className='flex justify-evenly py-1.5'>
            <strong className='pr-7'>{dest.price} $</strong><span className='flex'><Plane/> {dest.duration} days Trip </span>
            </div> 
            
        </div>
              <div className='flex justify-center py-4 '>
        <Button
          className="w-full"
          onClick={() => {
            setNavigatingId(dest?.id);
            router.push(`/destinationsList/${dest?.id}`);
          }}
          disabled={navigatingId === dest?.id}
        >
          {navigatingId === dest?.id ? (
            <div className="flex items-center justify-center w-full">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Booking...
            </div>
          ) : (
            'Book Now'
          )}
        </Button>

</div>
      </div>
    </div>

</div>
))
):(
<div>No destinations found. </div>
)}
</div>
        </div>
      
    </div>
  )
}

export default destinationsList
