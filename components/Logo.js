import Link from 'next/link'

// Original mark (a simple house-pin), not the real Airbnb logo.
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-brand" aria-label="Home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 2c-5.8 0-10.5 4.6-10.5 10.3 0 7.4 9 16.3 9.4 16.7a1.6 1.6 0 0 0 2.2 0c.4-.4 9.4-9.3 9.4-16.7C26.5 6.6 21.8 2 16 2zm5 12.6V19a1 1 0 0 1-1 1h-2.6v-3.6h-2.8V20H12a1 1 0 0 1-1-1v-4.4l5-4.1 5 4.1z"
        />
      </svg>
      <span className="hidden text-xl font-bold tracking-tight lg:inline">airbnb<span className="text-gray-400">clone</span></span>
    </Link>
  )
}
