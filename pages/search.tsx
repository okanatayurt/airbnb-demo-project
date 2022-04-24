import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
import MapComp from '../components/Map'

export interface SearchResultItem {
  img: string
  location: string
  title: string
  description: string
  star: number
  price: string
  total: string
  long: number
  lat: number
}

const Search = ({ searchResult }: any) => {
  const router = useRouter()
  const { location, startDate, endDate, noOfGuests } = router.query
  // @ts-ignore
  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
  // @ts-ignore
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')
  const range = `${formattedStartDate} - ${formattedEndDate}`
  return (
    <>
      {' '}
      <Head>
        <title>Airbnb Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
        <main className="mb-5 flex ">
          <section className=" flex-grow px-6 pt-14 ">
            <p className="mb-4 text-xs">
              300+ Stays -{' '}
              <span className=" rounded-md bg-[#FF385C] p-1 text-white">
                {range}
              </span>{' '}
              - {noOfGuests} guest(s)
            </p>
            <h1 className="mt-2 mb-6 text-3xl font-semibold">
              Stays in {location}
            </h1>
            <div className="mb-5 hidden gap-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
              <p className="cursor-pointer select-none rounded-full border px-4 py-2 transition duration-100 ease-out hover:shadow-lg active:scale-95 active:bg-gray-100">
                Cancellation Flexibility
              </p>
              <p className="cursor-pointer select-none rounded-full border px-4 py-2 transition duration-100 ease-out hover:shadow-lg active:scale-95 active:bg-gray-100">
                Type of Place
              </p>
              <p className="cursor-pointer select-none rounded-full border px-4 py-2 transition duration-100 ease-out hover:shadow-lg active:scale-95 active:bg-gray-100">
                Price
              </p>
              <p className="cursor-pointer select-none rounded-full border px-4 py-2 transition duration-100 ease-out hover:shadow-lg active:scale-95 active:bg-gray-100">
                Rooms and Beds
              </p>
              <p className="cursor-pointer select-none rounded-full border px-4 py-2 transition duration-100 ease-out hover:shadow-lg active:scale-95 active:bg-gray-100">
                More Filters
              </p>
            </div>
            <div className="flex flex-col">
              {searchResult.map((item: SearchResultItem) => (
                <InfoCard {...item} />
              ))}
            </div>
          </section>
          <section className="hidden xl:inline-flex  xl:min-w-[600px]">
            <MapComp searchResult={searchResult} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResult = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )

  return {
    props: {
      searchResult: searchResult,
    },
  }
}
