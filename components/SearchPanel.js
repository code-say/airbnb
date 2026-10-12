import { MapPinIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { destinations } from '../data/destinations'

export default function SearchPanel({
  location, setLocation, startDate, setStartDate, endDate, setEndDate,
  guests, setGuests, onSearch, onCancel,
}) {
  const q = location.trim().toLowerCase()
  const suggestions = destinations.filter((d) => !q || d.name.toLowerCase().includes(q)).slice(0, 6)

  const onStart = (v) => {
    setStartDate(v)
    if (v >= endDate) {
      const next = new Date(new Date(v).getTime() + 86400000).toISOString().slice(0, 10)
      setEndDate(next)
    }
  }

  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-6 sm:px-8 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Popular destinations</h3>
          <ul className="space-y-1">
            {suggestions.map((d) => (
              <li key={d.slug}>
                <button
                  type="button"
                  onClick={() => { setLocation(d.name); onSearch(d.name) }}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-gray-100"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gray-100">
                    <MapPinIcon className="h-5 w-5 text-gray-700" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{d.name}</span>
                    <span className="block text-xs text-gray-500">{d.drive}</span>
                  </span>
                </button>
              </li>
            ))}
            {!suggestions.length && <li className="px-2 py-2 text-sm text-gray-500">Press Search to look for “{location}”.</li>}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="rounded-xl border border-gray-300 px-3 py-2 focus-within:border-gray-900">
              <span className="block text-[11px] font-semibold uppercase tracking-wide">Check-in</span>
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => onStart(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <label className="rounded-xl border border-gray-300 px-3 py-2 focus-within:border-gray-900">
              <span className="block text-[11px] font-semibold uppercase tracking-wide">Check-out</span>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-300 px-3 py-2">
            <span>
              <span className="block text-sm font-semibold">Guests</span>
              <span className="block text-xs text-gray-500">Adults and children</span>
            </span>
            <span className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Fewer guests"
                disabled={guests <= 1}
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-gray-300 hover:border-gray-900 disabled:opacity-30"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-5 text-center font-medium" aria-live="polite">{guests}</span>
              <button
                type="button"
                aria-label="More guests"
                disabled={guests >= 16}
                onClick={() => setGuests((g) => Math.min(16, g + 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-gray-300 hover:border-gray-900 disabled:opacity-30"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </span>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onCancel} className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold underline underline-offset-2 hover:bg-gray-100">
              Cancel
            </button>
            <button type="button" onClick={() => onSearch()} className="flex-1 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
