import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { MagnifyingGlassIcon, GlobeAltIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid'
import Logo from './Logo'
import SearchPanel from './SearchPanel'

const toISODate = (d) => d.toISOString().slice(0, 10)
const addDays = (d, n) => new Date(d.getTime() + n * 86400000)

export default function Header({ placeholder, initial = {} }) {
  const router = useRouter()
  const today = new Date()
  const [location, setLocation] = useState(initial.location || '')
  const [startDate, setStartDate] = useState(initial.startDate || toISODate(addDays(today, 7)))
  const [endDate, setEndDate] = useState(initial.endDate || toISODate(addDays(today, 10)))
  const [guests, setGuests] = useState(Number(initial.guests) || 2)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const search = (loc = location) => {
    const where = loc.trim() || 'London'
    setOpen(false)
    router.push({ pathname: '/search', query: { location: where, startDate, endDate, guests } })
  }

  return (
    <header
      ref={wrapRef}
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled || open ? 'shadow-md' : 'border-b border-gray-100'}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-8">
        <Logo />

        <form
          role="search"
          onSubmit={(e) => { e.preventDefault(); search() }}
          className="mx-auto flex w-full max-w-md items-center rounded-full border border-gray-200 py-1.5 pl-5 pr-1.5 shadow-sm transition hover:shadow-md"
        >
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setOpen(true)}
            className="min-w-0 flex-grow bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-500"
            type="text"
            placeholder={placeholder || 'Where are you going?'}
            aria-label="Destination"
          />
          <button type="submit" aria-label="Search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-dark">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
        </form>

        <div className="flex items-center justify-end gap-2 text-gray-600">
          <span className="hidden cursor-pointer rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-100 md:inline">Become a host</span>
          <GlobeAltIcon className="hidden h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-gray-100 sm:block" aria-hidden="true" />
          <div className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 py-1 pl-3 pr-1 transition hover:shadow-md">
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            <UserCircleIcon className="h-8 w-8 text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>

      {open && (
        <SearchPanel
          location={location}
          setLocation={setLocation}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          guests={guests}
          setGuests={setGuests}
          onSearch={search}
          onCancel={() => setOpen(false)}
        />
      )}
    </header>
  )
}
