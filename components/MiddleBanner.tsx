import type { NextPage } from 'next'
import Image from 'next/image'

const MiddleBanner: NextPage = () => {
  return (
    <div className="2x:h-[700px] relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px]">
      <Image
        src="https://wallpaperaccess.com/full/1217818.jpg"
        layout="fill"
        objectFit="cover"
        className="rounded-b-xl"
      />
      <div className="absolute top-1/2 w-full px-10 text-center lg:top-1/3">
        <h1 className="hidden pb-16 text-5xl font-bold text-white lg:inline-flex">
          Welcome to Airbnb Demo
        </h1>
        <p className=" text-lg font-semibold text-white">
          Not sure where to go? Perfect.
        </p>
        <button className="my-3 rounded-full bg-white px-8 py-4 font-bold text-[#FF385C] shadow-md transition duration-150 hover:shadow-xl active:scale-90">
          Lets go!
        </button>
      </div>
    </div>
  )
}

export default MiddleBanner
