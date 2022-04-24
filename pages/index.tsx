import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MiddleBanner from '../components/MiddleBanner'

interface IExploreDataItemProps {
  img: string
  location: string
  distance: string
}

interface ICardsDataItemProps {
  img: string
  title: string
}

const Home = ({ exploreData, cardsData }: any) => {
  const [searchByClick, setSearchByClick] = React.useState('')

  return (
    <div className="bg-black">
      <Head>
        <title>Airbnb Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header searchByClick={searchByClick} />

      <main className="mx-auto max-w-7xl rounded-md px-8 sm:px-16">
        <MiddleBanner />
        <section className="pt-12">
          <h2 className="pb-5 text-3xl font-semibold text-white">
            Explore Nearby
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item: IExploreDataItemProps) => (
              <div
                onClick={() => {
                  setSearchByClick(item.location)
                }}
                className="m-2 mt-5 flex transform cursor-pointer items-center space-x-4 rounded-xl  transition duration-200 ease-out hover:scale-105 hover:bg-[#FF385C]"
              >
                <div className="relative h-16 w-16">
                  <Image src={item.img} layout="fill" className="rounded-lg" />
                </div>
                <div>
                  <h2 className="text-white">{item.location}</h2>
                  <h3 className="text-gray-200">{item.distance}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="pt-12">
          <h2 className="pb-5 text-3xl font-semibold text-white">
            Live Anywhere
          </h2>
          <div className="-ml-3 flex space-x-3 overflow-scroll p-3 scrollbar-hide">
            {cardsData?.map((item: ICardsDataItemProps) => (
              <div className="tranform cursor-pointer transition duration-300 ease-out hover:scale-105">
                <div className="relative h-64 w-64">
                  <Image src={item.img} layout="fill" className="rounded-xl" />
                </div>
                <h3 className="mt-3 text-2xl">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className="relative cursor-pointer py-12">
          <div className="relative h-96">
            <Image
              src="https://wallpaperaccess.com/full/537588.jpg"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          <div className="absolute top-32 left-12 font-bold text-white">
            <h3 className="mb-3 max-w-[256px] text-4xl">
              The Greatest Outdoors
            </h3>
            <p>Best ways found by Airbnb.</p>
            <button className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
              Get Inspired
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  )

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  )

  return {
    props: {
      exploreData: exploreData,
      cardsData: cardsData,
    },
  }
}
