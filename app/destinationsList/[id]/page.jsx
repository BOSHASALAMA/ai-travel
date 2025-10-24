'use client'
import { Button } from '@/components/ui/button'
import { Activity, Calendar, Clock, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

const page = ({params}) => {
    const {id}=use(params)
    const [destinations, setDestinations] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const router = useRouter();
    const [navigating, setNavigating] = useState(false);
    useEffect(() => {
if(id){
        fetchDestinations();

}    }, [id]);
    
    
    const fetchDestinations = async ()=> {
    try {
      const response = await fetch ("/api/destinations")

      const result =  await response.json()
if(result.success){
const foundDest=result.data.find((dest)=>dest.id===parseInt(id))
    if(foundDest){
    setDestinations(foundDest)           
    }else{
    setError("Destination not found")
    }
 } else{ 
    setError("Failed to fetch destination")
 }
    }catch (error) {
setError('Error:', error.message);
    }
    finally{
      setLoading(false)
        }}
          if(loading){
return(
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-b-slate-600'></div>
    </div>
)
    }
    const handleBookNow = () => { 
        // show loader on the button and navigate
        setNavigating(true);
        router.push(`/checkout?destinationId=${destinations.id}&name=${encodeURIComponent(destinations.name)}&price=${destinations.price}`, { scroll: false });
    }
  return (
    <div className='my-7 min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white shadow-2xl shadow-slate-900 '>
    <div className='max-w-7xl mx-auto px-5 py-5 '>
      {/* Hero section */}
<div className='relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl '>
{destinations.imageUrl && (
    <Image src={destinations.imageUrl} width={400} height={400} alt={destinations.name} className='w-full h-full object-cover'/>
)}
<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent'></div>
    <div className='absolute bottom-0 right-0 left-0 p-8 text-white'>
<h1 className='font-bold text-[30px]'>{destinations?.name}</h1>
   <div className='flex items-center text-xl md:text-2xl'>
       <MapPin className='w-6 h-6 mr-2'/>
    <span>{destinations?.country}, {destinations?.city}</span>
   </div>

    </div>
     </div>
<div>
    {/* main content */}
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
<div className='lg:col-span-2 space-y-8'>
{/* description */}
<div className='bg-slate-800 rounded-xl p-8 shadow-md shadow-blue-900'>
<h2 className='text-3xl font-bold text-gray-100 mb-6'>About this Destination</h2>
<p className='text-gray-100 text-lg leading-relaxed'>{destinations?.description}</p>
</div>
{/* highlights */}
<div className='bg-slate-800 rounded-xl p-8 shadow-md shadow-blue-900'>
    <div className='flex items-center mb-6'>
<Star className='w-8 h-8 mr-3 text-slate-950'/>
<h2>Highlights</h2>
    </div>
    <div className='text-gray-100 text-lg leading-relaxed'>
{destinations?.highlights.split(',').map((highlight, i)=>(
<div key={i} className='flex items-start mb-3' >
    <li className='ml-5'>{highlight.trim()}</li>
</div>
))  }
    </div>
</div>
{/* activities */}
<div className='bg-slate-800 rounded-xl p-8 shadow-md shadow-blue-900'>
     <div className='flex items-center mb-6'>
<Activity className='w-8 h-8 mr-3 text-slate-950'/>
<h2>Activities</h2>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
{destinations?.activities.split(',').map((activity, i)=>(
    <div key={i} className='bg-slate-700 rounded-md p-4 border-l-4 border-slate-950'>
        <p>{activity.trim()}</p>                                
    </div>
))}
</div>
</div>

<div>

</div>
    </div>
    {/* booking sideBar */}

<div className='lg:col-span-1'>
    <div className='bg-slate-800 rounded-xl p-8 shadow-md shadow-blue-900 sticky top-24'>
    <div className='text-center mb-8'>
        <strong className='font-bold mb-2 text-gray-100'>{destinations?.price} $ per person</strong>
</div>
{/* Trip Details */}
<div className='space-y-4 mb-8'>
<div className='flex items-center p-4 bg-slate-800/15 rounded-lg'>
<Clock className='w-6 h-6 mr-4 text-slate-950'/>
<div>
    <p className='text-gray-100'>Duration</p>
<p className='text-gray-200'>{destinations?.duration} days</p>
</div>
</div>

</div>
<div className='space-y-4 mb-8'>
<div className='flex items-center p-4 bg-slate-800/15 rounded-lg'>
<Calendar className='w-6 h-6 mr-4 text-slate-950'/>
<div>
    <p className='text-gray-100'>Best Season</p>
<p className='text-gray-200'>{destinations?.bestSeason} days</p>
</div>
</div>

</div>
<div className='space-y-4 mb-8'>
<div className='flex items-center p-4 bg-slate-800/15 rounded-lg'>
<MapPin className='w-6 h-6 mr-4 text-slate-950'/>
<div>
    <p className='text-gray-100'>Location</p>
<p className='text-gray-200'>{destinations?.country}, {destinations.city}</p>
</div>
</div>

</div>
<Button onClick={handleBookNow} className="w-full" disabled={navigating}>
    {navigating ? (
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
    </div>
    </div>)
}

export default page
