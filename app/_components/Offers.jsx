'use client'
import Image from 'next/image';
import React from 'react'


const Offers = () => {
  
   
  return (
    <>
    <h1 className='text-white text-center mb-14 font-extrabold md:text-5xl text-2xl'>We Offer Best Services</h1>
 <div className='flex justify-center gap-12 flex-wrap'>
   <div className="group w-52 h-64  [perspective:1000px] cursor-pointer">
    <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-slate-800 text-white">
<Image src="/plane.png" width={50} height={50} unoptimized={true} alt=''/>
<h2 className='mt-4 '>Calculated Weather</h2>

        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md bg-slate-900 text-white [transform:rotateY(180deg)]">
<p className='p-2 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum consectetur doloremque. Velit libero accusamus culpa obcaecati neque ut distinctio ipsa magnam quasi?</p>       
 </div>
    </div>
</div>
   <div className="group w-52 h-64  [perspective:1000px] cursor-pointer">
    <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-slate-800 text-white">
<Image src="/icon3.png" width={50} height={50} unoptimized={true} alt=''/>
<h2 className='mt-4'>Best Flights</h2>

        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md bg-slate-900 text-white [transform:rotateY(180deg)]">
<p className='p-2 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum consectetur doloremque. Velit libero accusamus culpa obcaecati neque ut distinctio ipsa magnam quasi?</p>       
        </div>
    </div>
</div>
   <div className="group w-52 h-64  [perspective:1000px] cursor-pointer">
    <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-slate-800 text-white">
<Image src="/microphone.png" width={50} height={50} unoptimized={true} alt=''/>
<h2 className='mt-4'>Local Events</h2>

        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md bg-slate-900 text-white [transform:rotateY(180deg)]">
<p className='p-2 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum consectetur doloremque. Velit libero accusamus culpa obcaecati neque ut distinctio ipsa magnam quasi?</p>       
        </div>
    </div>
</div>
<div className="group w-52 h-64  [perspective:1000px] cursor-pointer">
    <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-slate-800 text-white">
<Image src="/icon4.png" width={50} height={50} unoptimized={true} alt=''/>
<h2 className='mt-4'>Customization</h2>

        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md bg-slate-900 text-white [transform:rotateY(180deg)]">
<p className='p-2 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum consectetur doloremque. Velit libero accusamus culpa obcaecati neque ut distinctio ipsa magnam quasi?</p>       
        </div>
    </div>
</div>
 </div>
 </>
  )
}

export default Offers
