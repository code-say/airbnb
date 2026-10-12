import Image from 'next/image'
import Link from 'next/link'
import { unsplash } from '../data/destinations'

const searchHref = (location) => ({ pathname: '/search', query: { location } })

export function SmallCard({ name, drive, img }) {
  return (
    <Link
      href={searchHref(name)}
      className="flex items-center gap-4 rounded-xl p-2 transition duration-200 ease-out hover:scale-[1.03] hover:bg-gray-100"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        <Image src={unsplash(img, 160, 160)} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{drive}</p>
      </div>
    </Link>
  )
}

export function MediumCard({ title, img, query }) {
  return (
    <Link href={searchHref(query)} className="group shrink-0 snap-start">
      <div className="relative h-64 w-64 overflow-hidden rounded-2xl sm:h-80 sm:w-80">
        <Image
          src={unsplash(img, 640, 640)}
          alt=""
          fill
          sizes="(min-width: 640px) 320px, 256px"
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-xl font-medium sm:text-2xl">{title}</h3>
    </Link>
  )
}

export function LargeCard({ img, title, description, buttonText, href }) {
  return (
    <section className="relative my-16 overflow-hidden rounded-2xl">
      <div className="relative h-96 min-w-[300px]">
        <Image src={unsplash(img, 1600, 800)} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      </div>
      <div className="absolute left-8 top-1/2 max-w-xs -translate-y-1/2 text-white sm:left-12">
        <h3 className="mb-3 text-4xl font-semibold leading-tight">{title}</h3>
        <p className="text-white/90">{description}</p>
        <Link href={href} className="mt-5 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100">
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
