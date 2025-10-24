import Image from "next/image";
import Destination from "./_components/Destinations";
import Offers from "./_components/Offers";
import Hero from "./_components/Hero";


export default function Home() {
  return (
   <div>
    <Hero/>
    <Offers/>
    <Destination/>
   </div>
  );
}
