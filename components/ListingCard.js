import { useState } from 'react'
import Image from 'next/image'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, StarIcon } from '@heroicons/react/24/solid'
import { unsplash } from '../data/destinations'

const gbp = (n) => `£${n.toLocaleString('en-GB')}`

export default function ListingCard({ listing, nights, active, onHover }) {
  const [saved, setSaved] = useState(false)
  const { img, location, title, description, rating, reviews, price, superhost } = listing

  return (
    <article
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`flex gap-4 border-b py-6 transition first:border-t sm:gap-6 ${active ? 'bg-gray-50' : ''}`}
    >
      <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-2xl sm:h-52 sm:w-80">
        <Image src={unsplash(img, 640, 420)} alt={title} fill sizes="(min-width: 640px) 320px, 160px" className="object-cover" />
        {superhost && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold shadow">Superhost</span>
        )}
      </div>

      <div className="flex min-w-0 flex-grow flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm text-gray-500">{location}</p>
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            className="rounded-full p-1 transition hover:bg-gray-100 active:scale-90"
          >
            {saved ? <HeartSolid className="h-6 w-6 text-brand" /> : <HeartIcon className="h-6 w-6" />}
          </button>
        </div>

        <h4 className="text-lg font-medium sm:text-xl">{title}</h4>
        <div className="w-10 border-b pt-2" />
        <p className="flex-grow pt-2 text-sm text-gray-500">{description}</p>

        <div className="flex items-end justify-between pt-4">
          <p className="flex items-center gap-1 text-sm">
            <StarIcon className="h-4 w-4 text-brand" />
            <span className="font-semibold">{rating.toFixed(2)}</span>
            <span className="text-gray-500">({reviews})</span>
          </p>
          <div className="text-right">
            <p className="text-lg font-semibold sm:text-2xl">
              {gbp(price)} <span className="text-base font-normal text-gray-600">/ night</span>
            </p>
            <p className="text-sm font-light text-gray-600">{gbp(price * nights)} total</p>
          </div>
        </div>
      </div>
    </article>
  )
}
