import { useMemo, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ListingCard from '../components/ListingCard'
import { getListings } from '../data/destinations'

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gray-100" />,
})

const DAY = 86400000
const iso = (d) => d.toISOString().slice(0, 10)
const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}/.test(s) && !Number.isNaN(Date.parse(s))
const fmt = (s) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })

const FILTERS = [
  { key: 'all', label: 'All stays' },
  { key: 'entire', label: 'Entire place', test: (l) => /^Entire|Cabin|Cottage|Camper/.test(l.type) },
  { key: 'room', label: 'Private room', test: (l) => l.type === 'Private room' },
  { key: 'budget', label: 'Under £100', test: (l) => l.price < 100 },
  { key: 'superhost', label: 'Superhost', test: (l) => l.superhost },
]

const SORTS = {
  recommended: { label: 'Recommended', fn: () => 0 },
  priceAsc: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  priceDesc: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => b.rating - a.rating },
}

export default function Search({ location, startDate, endDate, guests, nights, listings }) {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recommended')
  const [activeId, setActiveId] = useState(null)

  const shown = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter)
    const list = f?.test ? listings.filter(f.test) : listings
    return [...list].sort(SORTS[sort].fn)
  }, [listings, filter, sort])

  const range = `${fmt(startDate)} – ${fmt(endDate)}`

  return (
    <>
      <Head>
        <title>{`Stays in ${location} · Airbnb Clone`}</title>
      </Head>

      <Header
        placeholder={`${location} · ${range} · ${guests} guest${guests > 1 ? 's' : ''}`}
        initial={{ location, startDate, endDate, guests }}
      />

      <main className="flex">
        <section className="min-w-0 flex-grow px-4 pt-10 sm:px-8 xl:max-w-[60%]">
          <p className="text-xs text-gray-600">
            {listings.length} stays · {range} · {nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''}
          </p>
          <h1 className="mb-6 mt-2 text-3xl font-semibold">Stays in {location}</h1>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className={`chip ${filter === f.key ? 'chip-active' : ''}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label className="ml-auto flex items-center gap-2 text-sm text-gray-600">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
              >
                {Object.entries(SORTS).map(([k, s]) => (
                  <option key={k} value={k}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col">
            {shown.map((l) => (
              <ListingCard key={l.id} listing={l} nights={nights} active={activeId === l.id} onHover={setActiveId} />
            ))}
            {!shown.length && (
              <p className="border-t py-12 text-center text-gray-500">No stays match that filter. Try another one.</p>
            )}
          </div>
        </section>

        <section className="sticky top-[73px] hidden h-[calc(100vh-73px)] flex-1 xl:block">
          <Map listings={listings} activeId={activeId} onSelect={setActiveId} />
        </section>
      </main>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const location = String(query.location || '').trim().slice(0, 60) || 'London'
  const today = new Date()
  const startDate = isDate(query.startDate) ? String(query.startDate).slice(0, 10) : iso(new Date(today.getTime() + 7 * DAY))
  let endDate = isDate(query.endDate) ? String(query.endDate).slice(0, 10) : iso(new Date(Date.parse(startDate) + 3 * DAY))
  if (Date.parse(endDate) <= Date.parse(startDate)) endDate = iso(new Date(Date.parse(startDate) + DAY))
  const nights = Math.max(1, Math.round((Date.parse(endDate) - Date.parse(startDate)) / DAY))
  // old links used noOfGuests, new ones use guests
  const guests = Math.min(16, Math.max(1, parseInt(query.guests || query.noOfGuests, 10) || 2))

  return {
    props: { location, startDate, endDate, guests, nights, listings: getListings(location) },
  }
}
