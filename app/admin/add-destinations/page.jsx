'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { ChangeEvent, EventHandler, FormEvent, FormEventHandler, useState } from 'react'
import { toast } from 'sonner'


const page = () => {
    
    const [step, setStep] = useState(1)
    const [imagePreview, setimagePreview] = useState(null)
    
    const [formData, setFormData] = useState({
        name: "",
        country : "",
        city:"",
        description : "",
        highlights : "" ,
        bestSeason :"",
        activities :"",
        price : "",
        duration : "",
        imageUrl : null

    })
    
    const handleChange=(e)=>{
    //  setFormData({...formData , [e.target.name]:e.target.value})
    const {name , value , files} = e.target
    if(files && files[0]){
        const file= files[0]
setFormData((prev) => ({...prev , [name]:file}))
const reader = new FileReader()
reader.onload = (e) => setimagePreview(e.target.result)
reader.readAsDataURL(file)
    }else{
        setFormData((prev ) => ({...prev , [name]:value}))

    }
    }
const handleSubmit = async (e)=>{
e.preventDefault()
try {
    const data = new FormData()
    Object.keys(formData).forEach((key)=>{
        data.append(key,formData[key])
    })
    const res = await fetch("/api/destinations",
        {
        method:"POST",
        body : data,
    })
    if(res.ok){
        toast.success("Destination added successfully")
    setFormData({
            name: "",
        country : "",
        city:"",
        description : "",
        highlights : "" ,
        bestSeason :"",
        activities :"",
        price : "",
        duration : "",
        imageUrl : null
    })
    setStep(1)
    }else{
        toast.error("something went wrong X")
    }
} catch (error) {
    console.log(error)
    toast.error("server error")
}
}
    const nextStep = () =>{
        setStep((prev)=> prev+1)
    }
       const prevStep = () =>{
        setStep((prev)=> prev-1)
    }
  return (
    <div className='py-14 px-12 flex justify-center h-full'>
  <section className="w-full p-6  bg-slate-800 md:rounded-l-md rounded-l-none shadow-md ">
    <h2 className="text-lg font-semibold text-white capitalize ">Add Destination</h2>

    <form onSubmit={handleSubmit}>
        <div className=" text-white">
            {
                step == 1 && (
                    <>
    <div>
                <label  htmlFor="name">Name</label>
                <input onChange={handleChange} id="name" name='name' value={formData.name} type="text" className="block w-full px-4 py-2 mt-2  bg-slate-900 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label  htmlFor="country">Country</label>
                <input onChange={handleChange} id="country" name='country' value={formData.country} type="text" className="block w-full px-4 py-2 mt-2  bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label  htmlFor="city">City</label>
                <input onChange={handleChange} id="city" name='city' value={formData.city} type="text" className="block w-full px-4 py-2 mt-2  bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            </>
                )
            }
        {
            step == 2 && (
                              <>
    <div>
                <label  htmlFor="description">Description</label>
<textarea onChange={handleChange} placeholder="Info" id='description' name='description' value={formData.description} className="block w-full px-4 py-2 mt-2 bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
            </div>

            <div>
                <label  htmlFor="highlights">Highlights</label>
<textarea onChange={handleChange} placeholder="Info" id='highlights' name='highlights' value={formData.highlights} className="block w-full px-4 py-2 mt-2 bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
            </div>

            <div>
                <label  htmlFor="bestSeason">Best Season</label>
                <input onChange={handleChange} id="bestSeason" name='bestSeason' value={formData.bestSeason} type="text" className="block w-full px-4 py-2 mt-2 bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            </>
            )
        }

           {
            step == 3 && (
                                  <>
    <div>
                <label  htmlFor="activities">Activities</label>
                <input onChange={handleChange} id="activities" name='activities' value={formData.activities} type="text" className="block w-full px-4 py-2 mt-2  bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label  htmlFor="price">Price</label>
                <input onChange={handleChange} id="price" name='price' value={formData.price} type="text" className="block w-full px-4 py-2 mt-2  bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label  htmlFor="duration">Duration</label>
                <input onChange={handleChange} id="duration" name='duration' value={formData.duration} type="text" className="block w-full px-4 py-2 mt-2  bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            </>
            )
           }
           {step == 4 && (
            <>
    <div>
                <label  htmlFor="image">Upload Image</label>
                <input onChange={handleChange} id="image" name='imageUrl' accept='image/*' type="file" className="block w-full px-4 py-2 mt-2  bg-slate-900  rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            
            {
                imagePreview && (
                    <div className='mt-4'>
                        <p className='text-sm text-gray-400 mb-2'>Preview:</p>
                        <Image src={imagePreview} width={200} height={200} alt='' className='object-cover'/>

                    </div>
                )
            }
            </div>
            </>
           )

           }
        </div>

        <div className="flex justify-end mt-6">
{step > 1 && (
                <Button type='button' onClick={prevStep} >Back</Button>

)}
{
    step < 4 && (
                    <Button type='button' onClick={nextStep} className='ml-5'>Next</Button>

    )
}
        </div>
        {
            step === 4 &&(
<Button type='submit' className='ml-5'>Submit</Button>
 
            )
        }
    </form>

</section>
    <div className='md:block hidden relative '>
<Image src='/formImg.png' width={500} height={600} alt='' className='rounded-r-md !h-full'/>
</div>
</div>
  )
}

export default page
