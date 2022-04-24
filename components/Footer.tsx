import type { NextPage } from 'next'

const Footer: NextPage = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 px-16  py-14 text-gray-600 md:grid-cols-4">
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="cursor-pointer font-bold">About</h5>
          <p className="cursor-pointer">How Airbnb Works</p>
          <p className="cursor-pointer">Newsroom</p>
          <p className="cursor-pointer">Investors</p>
          <p className="cursor-pointer">Airbnb Plus</p>
          <p className="cursor-pointer">Airbnb Luke</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="cursor-pointer font-bold">Coummunity</h5>
          <p className="cursor-pointer">Accessibility</p>
          <p className="cursor-pointer">This Is Not a Real Site</p>
          <p className="cursor-pointer">Its Pretty Fun</p>
          <p className="cursor-pointer">Yeditepe Univeristy</p>
          <p className="cursor-pointer">Graduation Project</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="cursor-pointer font-bold">Host</h5>
          <p className="cursor-pointer">Okan Atayurt</p>
          <p className="cursor-pointer">Presents</p>
          <p className="cursor-pointer">Airbnb Project</p>
          <p className="cursor-pointer">From Scratch</p>
          <p className="cursor-pointer">To End</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="cursor-pointer font-bold">Support</h5>
          <p className="cursor-pointer">Help Center</p>
          <p className="cursor-pointer">Trust & Safety</p>
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Say Hello</p>
          <p className="cursor-pointer">Uğur Tevfik Kaplancalı</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
