import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { auth } from '../firebase-config'

interface User {
  email: string
}

const Home = () => {
  const router = useRouter()
  const [tabState, setTabState] = useState(1)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassowrd] = useState('')
  const [error, setError] = useState('')

  const [user, setUser] = useState<User>()

  onAuthStateChanged(auth, (currentUser) => {
    //@ts-ignore
    setUser(currentUser)
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      router.push('/')
    } catch (e: any) {
      setError(e.message)
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      router.push('/')
    } catch (e: any) {
      setError(e.message)
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  return (
    <div className="flex-1 flex-col ">
      <Head>
        <title>Airbnb Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={user} />

      <main className="flex  justify-center px-5">
        <div className="mt-16 max-w-[500px] flex-1 flex-col rounded-md border-2 bg-white px-10 pt-14 pb-16 shadow-lg md:mt-28">
          <div className="animate-bounce text-center">
            <Image src="/logo.png" alt="Airbnb Logo" width={150} height={150} />
          </div>
          <div className="grid grid-cols-2 items-center gap-x-5 text-center">
            <h2
              onClick={() => {
                setTabState(1)
              }}
              className={`cursor-pointer  border-b-2 py-2 text-xl font-semibold  transition duration-300 ease-out hover:scale-105 hover:border-[#FF385C] hover:text-[#FF385C] ${
                tabState == 1
                  ? 'scale-105 border-[#FF385C] text-[#FF385C]'
                  : 'scale-100 border-gray-600 text-black'
              }`}
            >
              LOGIN
            </h2>
            <h2
              onClick={() => {
                setTabState(2)
              }}
              className={`cursor-pointer border-b-2 py-2 text-xl font-semibold  transition duration-300 ease-out hover:scale-105 hover:border-[#FF385C] hover:text-[#FF385C] ${
                tabState == 2
                  ? 'scale-105 border-[#FF385C] text-[#FF385C]'
                  : 'scale-100 border-gray-600 text-black'
              }`}
            >
              REGISTER
            </h2>
          </div>
          <div>
            {tabState == 1 ? (
              <div className="flex flex-col items-center justify-center gap-y-5 pt-10">
                <div className="w-full">
                  <h2 className="mr-auto pb-1.5 pl-2.5 font-semibold">Email</h2>
                  <input
                    name="loginEmail"
                    onChange={(e) => {
                      setLoginEmail(e.target.value)
                    }}
                    className="w-full rounded-lg border-2 py-2 px-3 font-semibold outline-none"
                    placeholder="Please enter your email"
                  />
                </div>
                <div className="w-full">
                  <h2 className="mr-auto pb-1.5 pl-2.5 font-semibold">
                    Password
                  </h2>
                  <input
                    onChange={(e) => {
                      setLoginPassword(e.target.value)
                    }}
                    type="password"
                    className="w-full rounded-lg border-2 py-2 px-3 font-semibold outline-none"
                    placeholder="Please enter your password"
                  />
                </div>
                {error && <p className="font-semibold text-red-700">{error}</p>}
                <button
                  onClick={login}
                  className="mt-5 rounded-full border-2 px-5 pt-1 pb-2 text-xl font-semibold  text-[#FF385C] hover:bg-[#FF385C] hover:text-white"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-5 pt-10">
                <div className="w-full">
                  <h2 className="mr-auto pb-1.5 pl-2.5 font-semibold">Email</h2>
                  <input
                    name="registerEmail"
                    onChange={(e) => {
                      setRegisterEmail(e.target.value)
                    }}
                    className="w-full rounded-lg border-2 py-2 px-3 font-semibold outline-none"
                    placeholder="Please enter your email"
                  />
                </div>
                <div className="w-full">
                  <h2 className="mr-auto pb-1.5 pl-2.5 font-semibold">
                    Password
                  </h2>
                  <input
                    onChange={(e) => {
                      setRegisterPassowrd(e.target.value)
                    }}
                    className="w-full rounded-lg border-2 py-2 px-3 font-semibold outline-none"
                    placeholder="Please enter your password"
                  />
                </div>
                {error && <p className="font-semibold text-red-700">{error}</p>}
                <button
                  onClick={register}
                  className="mt-5 rounded-full border-2 px-5 pt-1 pb-2 text-xl font-semibold  text-[#FF385C] hover:bg-[#FF385C] hover:text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
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
