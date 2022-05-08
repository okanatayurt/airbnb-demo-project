import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  SearchIcon,
  UsersIcon,
  UserCircleIcon,
  MenuIcon,
  GlobeAltIcon,
} from '@heroicons/react/solid'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
// @ts-ignore
import { DateRangePicker } from 'react-date-range'
// Date Picker Style
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const Header = ({ placeholder }: any) => {
  const [searchInput, setSearchInput] = React.useState('')
  const [noOfGuests, setNoOfGuests] = React.useState(1)
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())
  const [userClick, setUserClick] = React.useState(false)
  const router = useRouter()

  const logout = async () => {
    await signOut(auth)
  }

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    })
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  return (
    <header
      className={`sticky top-0 z-50 grid grid-cols-3 gap-x-3  p-5 shadow-md md:px-10 ${
        router.asPath == '/' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div
        onClick={() => {
          router.asPath != '/login' ? router.push('/') : null
        }}
        className="relative my-auto flex h-10 cursor-pointer items-center"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {router.asPath == '/login' ? (
        <div></div>
      ) : (
        <div className="flex items-center gap-x-2 rounded-full border-2  bg-white px-3 md:shadow-sm">
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}
            placeholder={placeholder || 'Start your search...'}
            className=" flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap bg-transparent text-sm text-gray-500 outline-none"
            type="text"
          />
          <SearchIcon
            onClick={() => {
              searchInput && search()
            }}
            className="hidden h-8 cursor-pointer rounded-full bg-[#FF385C] p-1.5 text-white md:inline-flex"
          />
        </div>
      )}
      {router.asPath == '/login' ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-end space-x-4 text-gray-500">
          <p
            className={`hidden cursor-pointer font-bold  lg:inline ${
              router.asPath == '/' ? 'text-white' : 'text-black'
            }`}
          >
            {auth.currentUser?.email}
          </p>
          <GlobeAltIcon
            className={`h-6 cursor-pointer  ${
              router.asPath == '/' ? 'text-white' : 'text-gray-500'
            } `}
          />
          <div className="relative cursor-pointer space-x-1 rounded-full border-2 p-2">
            <div
              onClick={() => {
                setUserClick(!userClick)
              }}
              className="flex"
            >
              <MenuIcon
                className={`h-6 text-gray-500 ${
                  router.asPath == '/' ? 'text-[#fff]' : 'text-gray-500'
                }`}
              />
              <UserCircleIcon
                className={`h-6 text-gray-500 ${
                  router.asPath == '/' ? 'text-[#fff]' : 'text-gray-500'
                }`}
              />
            </div>

            {userClick ? (
              <div
                onClick={() => {
                  logout()
                  setTimeout(() => {
                    router.push('/login')
                  }, 100)
                }}
                className="absolute -bottom-10 right-0 mr-5 w-full rounded-full bg-white p-1.5 text-center font-semibold transition duration-300"
              >
                Exit
              </div>
            ) : null}
          </div>
        </div>
      )}

      {searchInput && (
        <div
          className={`col-span-3 mx-auto mt-0.5 flex-col  rounded-md  bg-white px-4 pb-2 transition duration-200 ease-out`}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FF385C']}
            onChange={handleSelect}
          />

          <div className="mb-4 flex items-center border-b">
            <h2 className="flex-grow text-2xl font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => {
                setNoOfGuests(Number(e.target.value))
              }}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex pb-2">
            <button
              onClick={() => {
                setSearchInput('')
              }}
              className="flex-grow rounded-md py-2 text-gray-500  hover:bg-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow rounded-md py-2 text-[#FF385C]  hover:bg-[#FF385C] hover:text-white"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
